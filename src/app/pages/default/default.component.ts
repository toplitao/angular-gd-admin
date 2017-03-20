import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { UserService } from '../../providers/services/user.service';
import { AuthService } from '../../providers/services/auth.service';
@Component({
    selector: 'c-default',
    templateUrl: 'default.component.html',
})
export class DefaultComponent implements OnInit {
    private shop: any;
    constructor(private auth: AuthService) {
        this.shop = this.auth.user.shop;
    }

    ngOnInit() {

    }
}
