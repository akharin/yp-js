/**
 * Базовый класс для всплывающих окон
 */
class Popup extends EventEmitter {
	/**
	 * @param {Element} content контент окна
	 */
	constructor(content) {
		super();
		this._content = content;
	}

	/**
	 * Создаёт dom-структуру компонента
	 *
	 * @return {Element}
	 */
	create() {
		this._element = createElement('div', {class: 'popup'}, this._content);
		return this._element;
	}

	/**
	 * Показывает popup
	 */
	open() {
		if (this._element) {
			this._element.classList.add('popup_is-opened');
		}
	}

	/**
	 * Скрывает popup
	 */
	close() {
		if (this._element) {
			this._element.classList.remove('popup_is-opened');
		}
	}
}
