/**
 * Универсальное поле ввода, основанное на input
 */
class InputField extends EventEmitter {
	/**
	 * @param {object} inputProps свойства для внутреннего input, поле name обязательное
	 * @param {function} validateFn функция валидации значения, должна возвращать либо описание ошибки, либо null/undefined
	 * @param {string} defaultValue значение по умолчанию
	 */
	constructor(inputProps = {}, validateFn = () => null, defaultValue = '') {
		super();
		if (!inputProps.name) {
			throw new Error('inputProps.name is required');
		}
		this._inputProps = inputProps;
		this._validateFn = validateFn;
		this._defauleValue = defaultValue;
		this._isValid = !this._validateFn(this._defauleValue);
	}

	/**
	 * Создаёт dom-структуру компонента
	 *
	 * @return {Element}
	 */
	create() {
		this._input = createElement('input', {...this._inputProps, value: this._defauleValue});
		this._input.addEventListener('input', this._handleInput.bind(this));
		this._error = createElement('div', {class: 'popup__input-error', 'aria-live': 'polite'});
		this._element = createElement(
			'div',
			{},
			this._input,
			this._error
		);
		return this._element;
	}

	/**
	 * Сбрасывает значение на дефолтное
	 */
	reset() {
		if (this._input) {
			this._input.value = this._defauleValue;
			this._isValid = !this._validateFn(this._defauleValue);
		}
	}

	/**
	 * Обрабатывает изменение значения input
	 *
	 * @param {Event} event событие
	 * @private
	 */
	_handleInput(event) {
		const errorMessage = this._validateFn(event.target.value);
		const isValid = !errorMessage;
		this._error.textContent = errorMessage;
		const isValidChanged = this._isValid !== isValid;
		this._isValid = isValid;
		if (isValidChanged) {
			this.emit('validate', isValid);
		}
	}

	/**
	 * Поле name из свойств input
	 *
	 * @return {string}
	 */
	get name() {
		return this._inputProps.name;
	}

	/**
	 * Текущее значение
	 *
	 * @return {string|undefined}
	 */
	get value() {
		if (this._input) {
			return this._input.value;
		}
	}

	/**
	 * Корректно ли текущее значение
	 *
	 * @return {boolean}
	 */
	get isValid() {
		return this._isValid;
	}
}
