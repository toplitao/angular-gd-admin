import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Http, Response } from '@angular/http';
import { Config } from '../../config';
import { AuthHandler } from '../handlers/auth.handler';
import { Token, User } from '../models/user';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
    private _user: User = new User();
    private _onGetUser: Promise<boolean> = null;
    public loginEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private http: Http,
        private authHandler: AuthHandler,
        private userService: UserService,
    ) {
        console.log('--> AuthServcie init');
        if (this.authHandler.hasToken()) {
            this.restoreUser();
        }
    }

    public login(username: string, password: string) {
        this.getToken(username, password).catch((error: any) => {
            this.loginEvent.emit(false);
            return Observable.throw(error);
        }).subscribe((token: Token) => {
            console.log('>>>get token success');
            this.authHandler.saveToken(token);
            this.restoreUser();
        });
    }

    public get user(): User {
        return this._user;
    }

    public check(): boolean | Promise<boolean> {
        if (!!this._user.id) {
            return true;
        } else {
            if (this._onGetUser === null) {
                return false;
            } else {
                return this._onGetUser;
            }
        }
    }

    public loginOut(): void {
        this.clearToken();
        this.loginEvent.emit(false);
    }

    private getToken(username: string, password: string): Observable<Token> {
        let body = {
            client_id: Config.clientId,
            client_secret: Config.clientSecret,
            grant_type: Config.grantType,
            scope: Config.scope,
            username: username,
            password: password
        };
        return this.http.post(Config.getTokenUrl, body)
            .map((res: Response) => {
                return res.json();
            });
    }

    private clearToken(): void {
        this.authHandler.clearToken();
        for (let attr in this._user) {
            this._user[attr] = null;
        }
    }

    private restoreUser() {
        this._onGetUser = this.userService.getUser().toPromise().then((user) => {
            for (let attr in user) {
                this._user[attr] = user[attr];
            }
            this._onGetUser = null;
            this.loginEvent.emit(true);
            console.log('login success!!!!!!!!!!!!!!');
            return user._status !== -1;
        }).catch((error) => {
            this.loginEvent.emit(false);
            return false;
        });
    }
}
