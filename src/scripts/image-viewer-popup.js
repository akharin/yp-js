/**
 * Компонент просмотра изображения во всплывающем окне
 */
class ImageViewerPopup extends Popup {
	constructor() {
		super();
		// Кнопка закрытия окна
		const close = createElement('img', {class: 'popup__close', src: 'images/close.svg', alt: ''});
		close.addEventListener('click', this.close.bind(this));
		// Создание контента окна
		this._image = createElement('img', {class: 'popup__image', alt: ''});
		this._content = createElement(
			'div',
			{class: 'popup__content-image'},
			close,
			this._image
		);
	}

	/**
	 * Изменение отображаемого изображения
	 *
	 * @param {string} url ссылка на изображение
	 */
	changeImage(url) {
		this._image.src = url;
	}
}
