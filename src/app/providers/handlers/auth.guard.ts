import { Injectable } from '@angular/core';
import { AuthService } from '../services';
import {
    Router,
    CanActivate,
    CanActivateChild,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
    public lastUrl: string;

    constructor(public router: Router, private auth: AuthService) {
        console.log('--> AuthGuard init');
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        this.lastUrl = state.url;
        let check: boolean | Promise<boolean> = this.auth.check();
        console.log('check====>', check);
        return this.checkLogin(check);
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Promise<boolean> {
        return this.canActivate(route, state);
    }

    private checkLogin(check): boolean |  Promise<boolean> {
        if (typeof  check === 'boolean') {
            if (check === false) {
                this.router.navigate(['/login']);
            }
            return check;
        } else {
            return check.then((ret) => {
                if (!ret) {
                    this.router.navigate(['/login']);
                }
                return ret;
            }).catch((error) => {
                this.router.navigate(['/login']);
                return false;
            });
        }
    }
}
