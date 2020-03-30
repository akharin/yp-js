const initialCardsData = [{
	name: 'Архыз',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
}, {
	name: 'Челябинская область',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
}, {
	name: 'Иваново',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
}, {
	name: 'Камчатка',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
}, {
	name: 'Холмогорский район',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
}, {
	name: 'Байкал',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}, {
	name: 'Нургуш',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/khrebet-nurgush.jpg'
}, {
	name: 'Тулиновка',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/tulinovka.jpg'
}, {
	name: 'Остров Желтухина',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/zheltukhin-island.jpg'
}, {
	name: 'Владивосток',
	link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/vladivostok.jpg'
}];

const initialProfileData = {
	name: 'Jaques Causteau',
	job: 'Sailor, Researcher'
};

// Шина обмена событиями
const eventsBus = new EventEmitter();

// Модуль списка мест
const places = (() => {
	const element = document.querySelector('.places-list');
	if (!element) {
		return;
	}
	const list = new PlacesList(element, initialCardsData);
	list.render();
	// Подписка на событие клика по месту
	list.addEventListener('card-click', card => {
		// Отправка в общую шину события клика по месту
		eventsBus.emit('card-image-click', card.imageUrl);
	});
	// Подписка на глобальное событие добавления места
	eventsBus.addEventListener('card-add', data => {
		list.addCard(data);
	});
})();

// Модуль профиля
const profile = (() => {
	const name = document.querySelector('.user-info__name');
	const job = document.querySelector('.user-info__job');
	if (!name || !job) {
		return;
	}
	// Заполнение дефолтными значениями
	name.textContent = initialProfileData.name;
	job.textContent = initialProfileData.job;
	// Подписка на глобальное событие изменения профиля
	eventsBus.addEventListener('profile-edited', data => {
		name.textContent = data.name;
		job.textContent = data.job;
	});
})();

// Модуль контейнера popup'ов
const popupContainer = (() => {
	const element = document.querySelector('.popup-container');
	if (!element) {
		return;
	}
	return new PopupContainer(element);
})();

// Модуль просмотрщика изображений
const imageViewerPopup = ((container) => {
	if (!container) {
		return;
	}
	const popup = new ImageViewerPopup();
	container.addPopup('image-viewer', popup);
	// Подписка на глобальное событие клика по месту, для отображения его в всплывающем окне
	eventsBus.addEventListener('card-image-click', url => {
		popup.changeImage(url);
		popup.open();
	});
})(popupContainer);

// Модуль добавления места
const cardAddingPopup = ((container) => {
	if (!container) {
		return;
	}
	const popup = new CardAddingPopup();
	container.addPopup('card-adding', popup);
	// Подписка на событие получения данных из формы
	popup.addEventListener('submit', data => {
		// Отправка в общую шину события добавления места
		eventsBus.emit('card-add', data);
	});
	// Кнопка открытия popup'а
	const addingButton = document.querySelector('.user-info__button');
	if (addingButton) {
		addingButton.addEventListener('click', () => {
			popup.open();
		});
	}
})(popupContainer);

const profilePopup = ((container) => {
	if (!container) {
		return;
	}
	const popup = new ProfilePopup(initialProfileData);
	container.addPopup('profile', popup);
	// Подписка на событие получения данных из формы
	popup.addEventListener('submit', data => {
		// Отправка в общую шину события изменения профиля
		eventsBus.emit('profile-edited', data);
	});
	// Кнопка открытия popup'а
	const profileButton = document.querySelector('.user-info__edit');
	if (profileButton) {
		profileButton.addEventListener('click', () => {
			popup.open();
		});
	}
})(popupContainer);

