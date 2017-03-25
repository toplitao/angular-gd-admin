import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {OrderService}from '../../../providers/services/order.service';
@Component({
    selector:'order',
    styleUrls: ['list.component.scss'],
    templateUrl: 'list.component.html',
     providers: [ConfirmationService]
})
export class ListComponent implements OnInit{
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
       private repairer=[];
       private selectedRepairer:any;
       
       
       constructor(private orderservice:OrderService,private confirmationService: ConfirmationService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.orderList();
       }
      async orderList(){
           this.userInfo=await this.orderservice.orderlist();console.log('111',this.userInfo);
           this.userInfo.forEach(e=>{
               switch(e.status){
                   case 1:
                   e._status="待查看";
                   break;
                   case 2:
                   e._status="待分配";
                   break; 
                   case 3:
                   e._status="待确认";
                   break; 
                   case 4:
                   e._status="维修中";
                   break; 
                   case 5:
                   e._status="待发货";
                   break; 
                   case 6:
                   e._status="待收货";
                   break;
                    case 7:
                   e._status="待评价";
                   break;
                    case 8:
                   e._status="完成";
                   break; 
               }
           });
           
       }
       async detail(msg){
          if(msg.status==1){
             let params={id:msg.id};
             let m=await this.orderservice.readorder(params);
             if(m.status==1){
                 this.userInfo=m.data;
             }
          }
           this.userDetail=msg;
           this.Show.dialog=true;
       }
      msg(msg){
        //    this.confirmationService.confirm({
        //     message: '确认删除?',
        //     header: '提示',
        //     icon: 'fa fa-trash',
        //     accept: () => {
                this.msgs=[];
                this.msgs.push(msg);
        //     }
        // });
      }
     async onsearch(){
         
          let ret=await this.orderservice.ordersearch(this.search); console.log('1',this.search);
          this.userInfo=ret;
      }
    async distribution(order){
          this.selected=order;
          let ret=await this.orderservice.repairersearch(); console.log('1',ret);
          if(ret.length>0){
              this.repairer=ret;
              this.repairer.forEach(e=>{
                  if(e.status==1){
                      e._status='空闲';
                  }else{
                      e._status='忙碌';
                  }
                  e.works=e.apply_repair.length;
              });
              this.rshow=true;
          }
    }
    async selectrepair(){
         let params={uid:this.selectedRepairer.id,oid:this.selected.id};
         let ret=await this.orderservice.selectedrepairer(params);

         console.log(ret);
    }
} 