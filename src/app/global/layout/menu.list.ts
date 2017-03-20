import { Injectable } from '@angular/core';

@Injectable()
export class Menu {
    private menu;

    public get list() {
        return this.menu;
    }

    constructor() {
        this.menu = [
            {
                label: '1',
                icon: 'fa-star',
                items: [
                    { label: '1', icon: 'fa-star-o', routerLink: ['a'] },
                    { label: '2', icon: 'fa-star-o', routerLink: ['a/b'] }
                ]
            },
        ];
    }
}
