class Watch {
    public set: (variable: string, fn?: (newData?: any, oldData?: any) => void) => Watch;
    public do: (variable: string) => Watch;
    public delete: (variable: string) => Boolean;
}

export class $watch {

    public static create(variable?: string,
                         fn?: (newData?: any, oldData?: any) => void): Watch {
        this.base().addSet().addDelete().addNext();
        if (!!variable) {
            return this.setData(variable, fn);
        }
        return this._obj;
    }

    private static _obj: Watch;

    private static base() {
        this._obj = new Watch();
        Object.defineProperty(this._obj, '_value', {
            writable: true,
            configurable: false,
            value: new Object({})
        });
        return this;
    }

    private static setValue(variable: string, fn?: (newData?: any, oldData?: any) => void): any {
        Object.defineProperty(this._obj['_value'], variable, {
            writable: true,
            configurable: true,
            value: new Object({
                name: variable,
                value: null,
                fn: (newData?: any, oldData?: any) => fn(newData, oldData)
            })
        });
        return this._obj['_value'][variable];
    }

    private static setData(variable: string, fn?: (newData?: any, oldData?: any) => void): Watch {
        let _obj = this.setValue(variable, fn);
        if (this._obj[variable] !== undefined) {
            return this._obj;
        }
        Object.defineProperty(this._obj, variable, {
            writable: true,
            configurable: true,
        });
        Object.defineProperty(this._obj, variable, {
            set: (v) => {
                if (!!fn && v !== _obj.value) {
                    _obj.fn(v, _obj.value);
                }
                _obj.value = v;
            },
            get: () => {
                return _obj.value;
            }
        });
        return this._obj;
    }

    private static addSet() {
        this._obj.set = (variable: string, fn?: (newData?: any, oldData?: any) => void): Watch => this.setData(variable, fn);
        return this;
    }

    private static addNext() {
        this._obj.do = (variable: string): Watch => {
            if (this._obj[variable] !== undefined) {
                this._obj['_value'][variable].fn(this._obj['_value'][variable].value);
            }
            return this._obj;
        };
        return this;
    }

    private static addDelete() {
        this._obj.delete = (variable: string): Boolean => {
            if (this._obj[variable] === undefined) {
                return false;
            }
            return (delete this._obj[variable]) && (delete this._obj['_value'][variable]);
        };
        return this;
    }
}
