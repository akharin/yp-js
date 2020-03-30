/**
 * Создаёт dom-элемент
 *
 * @param {string} tagName тег создаваемого элемента
 * @param {object} props свойства
 * @param {Element|string} children дочерние элементы
 * @return {Element}
 */
function createElement(tagName, props = {}, ...children) {
	const element = document.createElement(tagName);
	const {style, ...restProps} = props;
	if (style && typeof style === 'object') {
		for (const key in style) {
			if (style.hasOwnProperty(key)) {
				element.style[key] = props.style[key];
			}
		}
	}
	for (const key in restProps) {
		if (restProps.hasOwnProperty(key)) {
			element.setAttribute(key, restProps[key]);
		}
	}
	for (const child of children) {
		if (typeof child === 'string') {
			element.textContent += child;
		} else if (child instanceof HTMLElement) {
			element.appendChild(child);
		}
	}
	return element;
}
