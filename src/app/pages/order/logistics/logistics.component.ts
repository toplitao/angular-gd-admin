import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector:'repairer',
    styleUrls: ['logistics.component.scss'],
    templateUrl: 'logistics.component.html'
})
export class LogisticsComponent implements OnInit{
       public dialog:boolean=true;
       public listType=[
           {label:"列表1",value:"1"},{label:"列表2",value:"2"}];

       ngOnInit(){

       }
} 