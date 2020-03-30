/**
 * Форма-контейнер для InputField
 */
class Form extends EventEmitter {
	/**
	 * @param {Array<InputField>} fields массив объектов InputField
	 * @param {object} formProps свойства элемента form
	 * @param {object} buttonProps свойства элемента button
	 * @param {string} buttonText отображаемый текст в элементе button
	 */
	constructor(fields = [], formProps = {}, buttonProps = {}, buttonText = '') {
		super();
		this._fields = fields;
		this._formProps = formProps;
		this._buttonProps = buttonProps;
		this._buttonText = buttonText;
	}

	/**
	 * Создаёт dom-структуру компонента
	 *
	 * @return {Element}
	 */
	create() {
		const fields = this._fields.map(item => {
			const element = item.create();
			item.addEventListener('validate', this._checkValidation.bind(this));
			return element;
		});
		this._button = createElement('button', {type: 'submit', ...this._buttonProps}, this._buttonText);
		this._form = createElement(
			'form',
			{class: 'popup__form', ...this._formProps},
			...fields,
			this._button
		);
		this._form.addEventListener('submit', this._handleSubmit.bind(this));
		this._checkValidation();
		return this._form;
	}

	/**
	 * Сбрасывает значения полей на дефолтные
	 */
	reset() {
		for (const field of this._fields) {
			field.reset();
		}
		this._checkValidation();
	}

	/**
	 * Обрабатывает событие submit формы
	 *
	 * @param {Event} event событие
	 * @private
	 */
	_handleSubmit(event) {
		event.preventDefault();
		// Если имеются ошибки при валидации у полей, завершаем обработку
		if (this._fields.some(field => !field.isValid)) {
			return;
		}
		// Формируем объект с данными, где ключи это name поля
		const data = this._fields.reduce((d, field) => {
			d[field.name] = field.value;
			return d;
		}, {});
		this.emit('submit', data);
	}

	/**
	 * Дизейблит button в зависимости от валидации полей
	 *
	 * @private
	 */
	_checkValidation() {
		const hasErrors = this._fields.some(field => !field.isValid);
		this._button.classList.toggle('popup__button_enable', !hasErrors);
		this._button.disabled = hasErrors;
	}
}
