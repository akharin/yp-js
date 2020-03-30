/**
 * Карточка места
 */
class PlaceCard {
	/**
	 * @param {string} name название
	 * @param {string} imageUrl ссылка на изображение
	 */
	constructor(name, imageUrl) {
		this._name = name;
		this._imageUrl = imageUrl;
	}

	/**
	 * Создаёт dom-структуру компонента
	 *
	 * @return {Element}
	 */
	create() {
		this._element = createElement(
			'div',
			{class: 'place-card'},
			createElement(
				'div',
				{class: 'place-card__image', style: {backgroundImage: `url(${this._imageUrl})`}},
				createElement('button', {class: 'place-card__delete-icon'})
			),
			createElement(
				'div',
				{class: 'place-card__description'},
				createElement('h3', {class: 'place-card__name'}, this._name),
				createElement('button', {class: 'place-card__like-icon'})
			)
		);
		return this._element;
	}

	/**
	 * Удаляет dom-элемент
	 */
	remove() {
		if (this._element) {
			this._element.remove();
			this._element = undefined;
		}
	}

	/**
	 * Ставит/снимает like
	 */
	like() {
		if (this._element) {
			const icon = this._element.querySelector('.place-card__like-icon');
			if (icon) {
				icon.classList.toggle('place-card__like-icon_liked');
			}
		}
	}

	/**
	 * Dom-элемент
	 *
	 * @return {Element|undefined}
	 */
	get element() {
		return this._element;
	}

	/**
	 * Ссылка на изображение
	 *
	 * @return {string}
	 */
	get imageUrl() {
		return this._imageUrl;
	}
}
