import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, AuthGuard } from '../../providers';
@Component({
    selector: 'login',
    styleUrls: ['login.scss'],
    templateUrl: 'login.html'
})
export class LoginComponent implements OnInit, OnDestroy {

    private subscription: any;

    constructor(public auth: AuthService,
                private router: Router,
                private authGuard: AuthGuard) {

    }

    ngOnInit() {
        this.subscription = this.auth.loginEvent.subscribe((check: boolean) => {
            if (check) {
                this.router.navigate([this.authGuard.lastUrl || '/']);
            } else {
                alert('登陆错误');
            }
        });
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
