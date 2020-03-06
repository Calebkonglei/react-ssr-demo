class EventEmeitter {
    constructor() {
        this._events = this._events || new Map();
        this._maxListeners = this._maxListeners || 10;
    }

    emit(type, ...args) {
        let handler;
        handler = this._events.get(type);
        if(Array.isArray(handler)) {
            for(let i=0;i<handler.length;i++) {
                Reflect.apply(handler[i], this, args)
            }
        } else {
            Reflect.apply(handler, this, args)
        }

        return true
    }

    addListener(type, fn) {
        const handler = this._events.get(type);
        if(!handler) {
            Reflect.set(this._events, type, fn)
        } else if(handler && typeof handler === 'function') {
            Reflect.set(this._events, type, [handler, fn]);
        } else {
            handler.push(fn)
        }
    }

    removeListener(type, fn) {
        const handler = this._events.get(type);
        if(handler && typeof handler === 'function') {
            Reflect.deleteProperty(type, fn);
        } else {
            let position;
            for(let i=0;i<handler.length;i++) {
                if(handler[i] === fn) {
                    position = i;
                } else {
                    position = -1;
                }
            }

            if(position!==-1) {
                handler.splice(position, 1);
                if(handler.length === 1) {
                    Reflect.set(this._events, type, handler[0])
                }
            } else {
                return this
            }
        }
    }

    once(type, fn) {
        const handler = this._events.get(type);
        this.addListener(type, (...args) => {
            Reflect.apply(handler, this, args)
            this.removeListener(type)
        })
    }
}

new EventEmeitter();