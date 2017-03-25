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
                label: '用户',
                icon: 'fa-star',
                items: [
                    { label: '会员管理', icon: 'fa-star-o', routerLink: ['user/member' ]},
                    { label: '维修员管理', icon: 'fa-star-o', routerLink: ['user/repairer'] }
                ]
            },
            {
                label: '维修单',
                icon: 'fa-star',
                items: [
                    { label: '维修单管理', icon: 'fa-star-o', routerLink: ['order/list'] },
                    { label: '物流', icon: 'fa-star-o', routerLink: ['order/logictics'] },
                ]
            },
            {
                label: '产品',
                icon: 'fa-star',
                items: [
                    { label: '产品资料', icon: 'fa-star-o', routerLink: ['goods'] },
                ]
            },
            {
                label: '配件',
                icon: 'fa-star',
                items: [
                    { label: '配件管理', icon: 'fa-star-o', routerLink: ['fitting/list'] },
                ]
            },
            {
                label: '交互',
                icon: 'fa-star',
                items: [
                    { label: '问题回答', icon: 'fa-star-o', routerLink: ['interactive/help'] },
                ]
            },
            {
                label: '信息',
                icon: 'fa-star',
                items: [
                    { label: '跟单资料', icon: 'fa-star-o', routerLink: ['information/documentary'] },
                    { label: '驻点信息', icon: 'fa-star-o', routerLink: ['information/station'] }
                ]
            },
            
        ];
    }
}
