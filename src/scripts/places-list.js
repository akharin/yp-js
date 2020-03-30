/**
 * Список карточек мест
 */
class PlacesList extends EventEmitter {
	/**
	 * @param {Element} container dom-контейнер для карточек
	 * @param {Array} initialData начальные данные
	 */
	constructor(container, initialData = []) {
		super();
		if (!container) {
			throw new Error('container is empty');
		}
		this._container = container;
		this._container.addEventListener('click', this._handleClick.bind(this));
		// Создание экземпляров PlaceCard
		this._cards = initialData.map(item => new PlaceCard(item.name, item.link));
	}

	/**
	 * Отрисовывает карточки в интерфейсе
	 */
	render() {
		for (const card of this._cards) {
			this._container.appendChild(card.create());
		}
	}

	/**
	 * Добавляет карточку
	 *
	 * @param {{name: string, link: string}} cardData объект с названием и ссылкой на изображение
	 */
	addCard(cardData) {
		const card = new PlaceCard(cardData.name, cardData.link);
		this._cards.push(card);
		this._container.appendChild(card.create());
	}

	/**
	 * Обрабатывает клик по списку
	 *
	 * @param {Event} event событие
	 * @private
	 */
	_handleClick(event) {
		if (event.target === this._container) {
			return;
		}
		// Находим карточку, по которой кликнули
		const card = this._findCardByEvent(event);
		if (!card) {
			return;
		}
		// Если кликнули по иконке like
		if (event.target.classList.contains('place-card__like-icon')) {
			card.like();
			return;
		}
		// Если кликнули по иконке удаления
		if (event.target.classList.contains('place-card__delete-icon')) {
			this._cards = this._cards.filter(item => item !== card);
			card.remove();
			return;
		}
		this.emit('card-click', card);
	}

	/**
	 * Находит карточку по событию клика
	 *
	 * @param {Event} event событие
	 * @return {PlaceCard}
	 * @private
	 */
	_findCardByEvent(event) {
		// Из всех элементов, которые располагаются в месте клика, находим элемент с классом place-card
		const element = event.path.find(item => item instanceof HTMLElement && item.classList.contains('place-card'));
		// По этому элементу определяем необходимый экземпляр PlaceCard
		return this._cards.find(card => card.element === element);
	}
}
