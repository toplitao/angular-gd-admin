import { Injectable } from '@angular/core';
import { Token } from '../models/user';

@Injectable()
export class AuthHandler {
    private token: Token = null;

    constructor() {
        this.restoreToken();
    }

    public hasToken() {
        return !!this.token;
    }

    public clearToken() {
        this.token = null;
        localStorage['token'] = null;
    }

    public saveToken(token: Token) {
        this.token = token;
        localStorage['token'] = JSON.stringify(this.token);
    }

    public getToken(): Token {
        return this.token;
    }

    public getAuthorization(): string {
        if (this.token) {
            return this.token.token_type + ' ' + this.token.access_token;
        }
        return '';
    }

    private restoreToken() {
        try {
            this.token = JSON.parse(localStorage['token']);
        } catch (e) {
            this.token = null;
        }
    }
}
