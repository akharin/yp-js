/**
 * Класс с поддержкой событийной модели
 */
class EventEmitter {
	constructor() {
		this._events = {};
	}

	addEventListener(event, listener) {
		if (!this._events[event]) {
			this._events[event] = [];
		}
		this._events[event].push(listener);
	}

	removeEventListener(event, listener) {
		if (this._events[event]) {
			this._events[event] = this._events[event].filter(fn => fn !== listener);
		}
	}

	emit(event, data) {
		if (this._events[event]) {
			for (const listener of this._events[event]) {
				listener.call(null, data);
			}
		}
	}
}
