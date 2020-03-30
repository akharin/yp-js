/**
 * Контейнер popup'ов, в данной реализации просто добавляет popup'ы на страницу
 */
class PopupContainer {
	/**
	 * @param {Element} container dom-контейнер
	 */
	constructor(container) {
		this._container = container;
		this._popups = {};
	}

	/**
	 * Добавляет popup
	 *
	 * @param {string} id идентификатор
	 * @param {Popup} popup экземпляр Popup
	 */
	addPopup(id, popup) {
		this._popups[id] = popup;
		this._container.appendChild(popup.create());
	}

	/**
	 * Показывает popup
	 *
	 * @param {string} id идентификатор
	 */
	openPopup(id) {
		if (this._popups[id]) {
			this._popups[id].open();
		}
	}

	/**
	 * Скрывает popup
	 *
	 * @param {string} id идентификатор
	 */
	closePopup(id) {
		if (this._popups[id]) {
			this._popups[id].close();
		}
	}
}
