import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {OrderService}from '../../../providers/services/order.service';
@Component({
    selector:'order',
    styleUrls: ['logistics.component.scss'],
    templateUrl: 'logistics.component.html',
     providers: [ConfirmationService]
})
export class LogisticsComponent implements OnInit{
       public Show:any=[
           {'dialog':false,'tableshow':true,'cshow':false,'addshow':false,'updateshow':false}
           ]
       public listType=[
           {label:"列表1",value:true},{label:"列表2",value:false}];
       public msgs:any=[];
       public rshow:boolean=false;
       public userDetail:any=[];
       private userInfo:any=[];
       private selected:any;
       private search:any={id:null,name:null};
       private number:any;
       private company:any=[];
       private selectedCompany:any;
       
       
       constructor(private orderservice:OrderService,private confirmationService: ConfirmationService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.expressCompany();
       }
       async expressCompany(){
           this.company=await this.orderservice.companylist();
           this.company.forEach(e=>{
               e.label=e.name;
               e.value=e.code;
           });
       }
       async expressInfo(){console.log('1111',this.selectedCompany);
           let params={'LogisticCode':this.number,'ShipperCode':this.selectedCompany}
           this.userInfo=await this.orderservice.expressinfo(params);
           if(this.userInfo.Success){
               this.rshow=true;
           }
       }
} 