import { Component, AfterViewInit, ViewChild, QueryList,OnDestroy,OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, Event, NavigationEnd } from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { Menu } from '../menu.list';
import { TabView, TabPanel } from 'primeng/primeng';
import { AuthService } from '../../../providers/services/auth.service';
@Component({
    selector: 'tab-menu',
    styleUrls: ['tab-menu.component.scss'],
    templateUrl: 'tab-menu.component.html',
})
export class TabMenuComponent implements AfterViewInit ,OnDestroy,OnInit{
    private items: MenuItem[];
    @ViewChild(TabView) private tabView: TabView;
    private tabPanelList = [];
    private tabPanelNameList = [];// todo 中文标题
    private subscription: any;
    constructor(private menu: Menu, private router: Router, private location: Location,private auth:AuthService) {
        
        let subscription=this.auth.loginEvent.subscribe((status:boolean)=>{
            if(!status){
                console.log("destroy");
                
                this.subscription.unsubscribe();
                subscription.unsubscribe();
            }
        });
    }
    ngOnInit(){
        // todo 监听当前路由是否为/路由，是则初始化一个tabpannel。不是则初始化两个，路由变化则增加一个元素
        let indexTabPanel: TabPanel = new TabPanel();
        indexTabPanel.header = '首页';
        this.tabPanelList.push(indexTabPanel);
        this.subscription=this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                this.routeChanged();
            }
        });
        console.log("nginit");
    }

    private routeChanged(): void {
        let path: string = this.location.path();
        console.log('Path:' + path);
        let indexTabPanel: TabPanel = new TabPanel();
        indexTabPanel.header = path;
        indexTabPanel.closable = true;
        this.uniquePush(indexTabPanel);
    }

    private uniquePush(panel: TabPanel) {
        let flag = 0;
        for (let i = 0; i < this.tabPanelList.length; i++) {
            if (this.tabPanelList[i].header == panel.header) {
                flag++;
            }
        }
        if (flag == 0) {// 不存在相同
            this.tabPanelList.push(panel);
            flag = 0;
        }
    }

    ngAfterViewInit() {


        // let qt = [];
        // for( let i = 0; i < 10; i++){
        //     let tp = new TabPanel();
        //     tp.header = '第' + i + '个tab';
        //     if( i % 2 === 0 ){
        //         tp.closable = true;
        //     }
        //     qt.push(tp);
        // }
        // this.tabView.tabs=qt;
        this.tabView.tabs = this.tabPanelList;

    }

    handleChange(e) {
        var index = e.index;
        console.log(index);

    }
    ngOnDestroy(){
    }
}