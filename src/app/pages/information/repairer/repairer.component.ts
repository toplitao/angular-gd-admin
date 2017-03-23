import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

@Component({
    selector:'repairer',
    styleUrls: ['repairer.component.scss'],
    templateUrl: 'repairer.component.html'
})
export class RepairerComponent implements OnInit{
       public dialog:boolean=true;
       public listType=[
           {label:"列表1",value:"1"},{label:"列表2",value:"2"}];

       ngOnInit(){

       }
} 