import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, User } from '../../../providers';
@Component({
    selector: 'header-component',
    styleUrls: ['header.component.scss'],
    templateUrl: 'header.component.html',
})

export class HeaderComponent implements OnInit {
    public user: User;
    public isDisplay: boolean = true;
    public isWarning: number;
    private shops: any[] = [];
    private shopId: string;
    @Output() public menu: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(public auth: AuthService,
        private router: Router) {

        this.user = auth.user;
    }
    async ngOnInit() {
    }
    changeShop(params) {
        this.auth.user.shop.id = params.value;
    }

    public loginOut(): void {
        this.auth.loginOut();
        console.log('login out success !!!!!!!!');
        this.router.navigate(['/login']);
    }

    public move() {
        this.isDisplay = !this.isDisplay;
        this.menu.emit(this.isDisplay);
    }
    public route(e) {
    }
}
