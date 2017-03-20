import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class UserService {
    private apis: any = {
        user: 'user'
    };

    constructor(private api: Api) {

    }

    public getUser(): Observable<any> {
        return this.api.get(this.apis.user);
    }
}
