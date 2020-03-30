/**
 * Валидатор обязательного значения
 *
 * @param {string} value значение
 * @return {string|undefined}
 */
function validateRequired(value) {
	if (!value || !value.length) {
		return 'Обязательное поле';
	}
}

/**
 * Валидатор минимальной и максимальной длины строки
 *
 * @param {string} value значение
 * @param {number} min минимальное количество символов
 * @param {number} max максимальное количество символов
 * @return {string|undefined}
 */
function validateLength(value, min = 2, max = 30) {
	if (value.length < min || value.length > max) {
		return `Должно быть от ${min} до ${max} символов`;
	}
}

/**
 * Валидатор url строки
 *
 * @param {string} value значение
 * @return {string|undefined}
 */
function validUrl(value) {
	const pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
		'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
		'((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
		'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
		'(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
		'(\\#[-a-z\\d_]*)?$','i'); // fragment locator
	if (!pattern.test(value)) {
		return 'В поле должна быть ссылка';
	}
}

/**
 * Применяет несколько валидаторов, вызывая их по очередности и возвращая первую полученную ошибку
 *
 * @param {function} validators фунции валидации
 * @return {function}
 */
function composeValidators(...validators) {
	return value => {
		for (const fn of validators) {
			const error = fn(value);
			if (error) {
				return error;
			}
		}
	};
}
