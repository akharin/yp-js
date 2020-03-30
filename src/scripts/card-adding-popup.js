/**
 * Компонент добавления места во всплывающем окне
 */
class CardAddingPopup extends Popup {
	constructor() {
		super();
		// Кнопка закрытия окна
		const close = createElement('img', {class: 'popup__close', src: 'images/close.svg', alt: ''});
		close.addEventListener('click', this.close.bind(this));
		// Инициализация формы и полей
		this._form = new Form(
			[
				new InputField({
					type: 'text',
					name: 'name',
					class: 'popup__input popup__input_type_name',
					placeholder: 'Название'
				}, composeValidators(validateRequired, validateLength)),
				new InputField({
					type: 'text',
					name: 'link',
					class: 'popup__input popup__input_type_link-url',
					placeholder: 'Ссылка на картинку'
				}, composeValidators(validateRequired, validUrl))
			],
			{name: 'new'},
			{class: 'button popup__button'},
			'+'
		);
		this._form.addEventListener('submit', this._handleFormSubmit.bind(this));
		// Создание контента окна
		this._content = createElement(
			'div',
			{class: 'popup__content'},
			close,
			createElement('h3', {class: 'popup__title'}, 'Новое место'),
			this._form.create()
		);
	}

	/**
	 * Обрабатывает изменение данных формы
	 *
	 * @param {object} data данные формы
	 * @private
	 */
	_handleFormSubmit(data) {
		this.close();
		this._form.reset();
		this.emit('submit', data);
	}
}
