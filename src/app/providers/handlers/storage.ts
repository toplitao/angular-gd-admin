import { Injectable } from '@angular/core';

@Injectable()
export class Storage {

    public static set(key: string, value: string) {
        localStorage[key] = value;
    }

    public static get(key: string, _default?: string) {
        let value = localStorage[key];
        if (value !== null) {
            return value;
        } else {
            return _default;
        }
    }

    public static has(key: string) {
        return typeof localStorage[key] === 'undefined';
    }

    public static forget(key: string) {
        if (Storage.has(key)) {
            return delete localStorage[key];
        }
        return false;
    }
}
