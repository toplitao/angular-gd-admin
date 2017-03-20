import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { Menu } from '../menu.list';
@Component({
    selector: 'pagelayout',
    styleUrls: ['page.layout.component.scss'],
    templateUrl: 'page.layout.component.html',
})
export class PageLayoutComponent implements OnInit {
    private items: MenuItem[];

    public state: boolean = true;

    constructor(private menu: Menu) {

    }

    ngOnInit() {

        this.items = this.menu.list;

    }
    public move(e: boolean) {
        this.state = e;
    }
}
