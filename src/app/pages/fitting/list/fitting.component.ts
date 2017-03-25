import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {FittingService}from '../../../providers/services/fitting.service';
@Component({
    selector:'fitting',
    styleUrls: ['fitting.component.scss'],
    templateUrl: 'fitting.component.html',
     providers: [ConfirmationService]
})
export class ListComponent implements OnInit{
       public Show:any=[
           {'dialog':false,'tableshow':true,'cshow':false,'addshow':false,'updateshow':false}
           ]
       public listType=[
           {label:"列表1",value:true},{label:"列表2",value:false}];
       public msgs:any=[];
       public fittinglogDetail:any=[];
       public fittingDetail:any=[];
       private userInfo:any=[];
       private selected:any;
       private search:any={id:null,name:null};
       
       constructor(private fittingservice:FittingService,private confirmationService: ConfirmationService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.userList();
       }
      async userList(){
           this.userInfo=await this.fittingservice.fittinglist();
       }
       update(msg){
           this.fittingDetail=msg;
           this.Show.cshow=true;
           this.Show.updateshow=true;
           this.Show.addShow=false;
       }
       async updatepost(){
            let msg=await this.fittingservice.fittingupdate(this.fittingDetail);
            if(msg.status==1){
                this.userInfo=msg.data;
                this.Show.cshow=false;
                let msgs={severity:'info', summary:'提示', detail:'修改成功'};
                this.msg(msgs);
            }else{
                let msgs={severity:'error', summary:'提示', detail:'修改失败'};
                this.msg(msgs);
            }
       }
      async add(postdata?:any){
           if(postdata){
               let msg=await this.fittingservice.fittingadd(this.fittingDetail);
               if(msg.status==1){
                   this.userInfo=msg.data;
                   let msgs={severity:'info', summary:'提示', detail:'添加成功'};
                   this.msg(msgs);
               }else{
                   let msgs={severity:'error', summary:'提示', detail:'添加失败'};
                   this.msg(msgs);
               }
               console.log('data',msg);
               this.Show.cshow=false;
           }else{
                this.fittingDetail={
                    id:null,
                    fittings_name:null,
                    number:null,
                    price:null,
                    content:null,
                };
                this.Show.cshow=true
                this.Show.addshow=true;
                this.Show.updateshow=false;
           }
           
           
       }
       async del(data){
            let params={id:data.id};
            let msg=await this.fittingservice.fittingdel(params);
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
      async selectedDel(){
          let str='';
          this.selected.forEach(e=>{
              str+=e.id+','
          });
          str=str.substring(0,str.length-1);
          let params={ids:str};
          let msg=await this.fittingservice.fittingdel(params);
          if(msg.status==1){
              this.userInfo=msg.data;
          }

      }
     async onsearch(){
         
          let ret=await this.fittingservice.fittingsearch(this.search); console.log('1',this.search);
          this.userInfo=ret;
      }
      async fittinglog(fitting){
          let params={id:fitting.id};
          let ret=await this.fittingservice.fittinglog(params);
          this.fittinglogDetail=ret.data;
          if(this.fittinglogDetail){
            this.fittinglogDetail.forEach(e=>{
                if(e.type==1){
                    e._type="存";
                }else if(e.type==-1){
                    e._type="取";
                }else{
                    e._type="";
                }
            });
           }
          this.Show.dialog=true;
      }
} 