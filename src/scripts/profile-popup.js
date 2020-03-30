/**
 * Компонент редактирования профиля во всплывающем окне
 */
class ProfilePopup extends Popup {
	/**
	 * @param {{name: string, job: string}} defaultData дефолтные данные
	 */
	constructor(defaultData) {
		super();
		// Кнопка закрытия окна
		const close = createElement('img', {class: 'popup__close', src: 'images/close.svg', alt: ''});
		close.addEventListener('click', this.close.bind(this));
		// Инициализация формы и полей
		this._form = new Form(
			[
				new InputField(
					{type: 'text', name: 'name', class: 'popup__input', placeholder: 'Имя'},
					composeValidators(validateRequired, validateLength),
					defaultData.name
				),
				new InputField(
					{type: 'text', name: 'job', class: 'popup__input', placeholder: 'О себе'},
					composeValidators(validateRequired, validateLength),
					defaultData.job
				)
			],
			{name: 'new'},
			{class: 'button popup__button popup__button_text18'},
			'Сохранить'
		);
		this._form.addEventListener('submit', this._handleFormSubmit.bind(this));
		// Создание контента окна
		this._content = createElement(
			'div',
			{class: 'popup__content'},
			close,
			createElement('h3', {class: 'popup__title'}, 'Редактировать профиль'),
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
		this.emit('submit', data);
	}
}
