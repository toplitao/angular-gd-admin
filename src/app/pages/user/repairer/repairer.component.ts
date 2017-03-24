import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {MemberService}from '../../../providers/services/member.service';
@Component({
    selector:'repairer',
    styleUrls: ['repairer.component.scss'],
    templateUrl: 'repairer.component.html',
     providers: [ConfirmationService]
})
export class RepairerComponent implements OnInit{
       public Show:any=[
           {'dialog':false,'tableshow':true,'cshow':false,'addshow':false,'updateshow':false}
           ]
       public listType=[
           {label:"列表1",value:true},{label:"列表2",value:false}];
       public msgs:any=[];
       public userDetail:any=[];
       private userInfo:any=[];
       private selected:any;
       private search:any={id:null,username:null};
       
       constructor(private repairerservice:MemberService,private confirmationService: ConfirmationService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.userList();
       }
      async userList(){
           this.userInfo=await this.repairerservice.repairerlist();
           this.userInfo.forEach(e=>{
               if(e.status==1){
                   e._status="空闲";
               }else{
                   e._status="忙碌";
               }
           });
           console.log('111',this.userInfo);
       }
       detail(msg){ console.log('msg',msg);
           this.userDetail=msg;
           this.Show.dialog=true;
       }
       update(msg){
           this.userDetail=msg
           this.Show.cshow=true
           this.Show.updateshow=true;
           this.Show.addShow=false;
       }
       async updatepost(){
            let msg=await this.repairerservice.repairerupdate(this.userDetail);
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
               let msg=await this.repairerservice.repaireradd(this.userDetail);
               if(msg.status==1){
                   this.userInfo=msg.data;
                   let msgs={severity:'info', summary:'提示', detail:'添加成功'};
                   this.msg(msgs);
               }else{
                   let msgs={severity:'error', summary:'提示', detail:'添加失败'};
                   this.msg(msgs);
               }
               this.Show.cshow=false;
           }else{
                this.userDetail={
                    id:null,
                    username:null,
                    address:null,
                    phone:null,
                    email:null,
                };
                this.Show.cshow=true
                this.Show.addshow=true;
                this.Show.updateshow=false;
           }
           
           
       }
       async del(data){
            let params={id:data.id};
            let msg=await this.repairerservice.repairerdel(params);
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
          let msg=await this.repairerservice.repairerdel(params);
          if(msg.status==1){
              this.userInfo=msg.data;
          }

      }
     async onsearch(){
         
          let ret=await this.repairerservice.repairersearch(this.search); console.log('1',this.search);
          this.userInfo=ret;
      }
} 