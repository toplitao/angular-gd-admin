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
                    { label: '维修单管理', icon: 'fa-star-o', routerLink: 'member' },
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
                    { label: '配件管理', icon: 'fa-star-o', routerLink: 'member' },
                ]
            },
            {
                label: '交互',
                icon: 'fa-star',
                items: [
                    { label: '视频审核', icon: 'fa-star-o', routerLink: 'member' },
                    { label: '问题回答', icon: 'fa-star-o', routerLink: 'member' },
                ]
            },
            {
                label: '信息',
                icon: 'fa-star',
                items: [
                    { label: '人员资料', icon: 'fa-star-o', routerLink: ['a/b'] },
                    { label: '跟单资料', icon: 'fa-star-o', routerLink: ['a/b'] },
                    { label: '驻点信息', icon: 'fa-star-o', routerLink: ['a/b'] }
                ]
            },
            {
                label: '设置',
                icon: 'fa-star',
                items: [
                    { label: '审核', icon: 'fa-star-o', routerLink: 'member' },
                    { label: '发布', icon: 'fa-star-o', routerLink: ['a/b'] }
                ]
            },
            
        ];
    }
}
