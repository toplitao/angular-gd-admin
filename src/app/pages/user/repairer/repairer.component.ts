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
           {'dialog':false,'tableshow':'1','cshow':false,'addshow':false,'updateshow':false}
           ]
       public listType=[
           {label:"已审核",value:'1'},{label:'未审核',value:'2'},{label:'未通过',value:'3'}];
       public msgs:any=[];
       public userDetail:any=[];
       private userInfo:any=[];
       private selected:any;
       private search:any={id:null,username:null};
       private ycheck:any=[];
       private ncheck:any=[];
       private ucheck:any=[];
       constructor(private repairerservice:MemberService,private confirmationService: ConfirmationService){
       }

      async ngOnInit(){
           this.Show.tableshow='1';
           this.userList();
       }
      async userList(){
           this.userInfo.length=0;
           this.ucheck.length=0;
           this.ycheck.length=0;
           this.ncheck.length=0;
           this.userInfo=await this.repairerservice.repairerlist();
           this.userInfo.forEach(e=>{
               if(e.level==1){//未审核
                   this.ucheck.push(e);
               }else if(e.level==2){//通过
                   this.ycheck.push(e);
               }else{//未通过
                   this.ncheck.push(e);
               }
               if(e.status==1){
                   e._status="空闲";
               }else if(e.status==2){
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
                //this.userInfo=msg.data;
                this.Show.cshow=false;
                this.Show.tableshow='1';
                this.userList()
                let msgs={severity:'info', summary:'提示', detail:'操作成功'};
                this.msg(msgs);
            }else{
                let msgs={severity:'error', summary:'提示', detail:'操作失败'};
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
            if(msg.status==1){
                this.userList();
            }
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
         
          let ret=await this.repairerservice.repairersearch(this.search); console.log('1',ret);
          this.ucheck.length=0;
           this.ycheck.length=0;
           this.ncheck.length=0;
          if(this.search.id){console.log('1',ret[0].level);
              if(ret[0].level==1){
                   this.Show.tableshow='2';
                   this.ucheck=ret;
                   if(ret[0].status==1){
                       ret[0]._status='空闲';
                   }else{
                       ret[0]._status='忙碌';
                   }
              }else if(ret[0].level==2){
                   this.ycheck=ret;
                   this.Show.tableshow='1';
              }else{
                   this.ncheck=ret;
                   this.Show.tableshow='3';
              }
          }else{
               this.Show.tableshow='1';
               ret.forEach(e=>{
                if(e.level==1){//未审核
                    this.ucheck.push(e);
                }else if(e.level==2){//通过
                    this.ycheck.push(e);
                }else{//未通过
                    this.ncheck.push(e);
                }
                if(e.status==1){
                    e._status="空闲";
                }else if(e.status==2){
                    e._status="忙碌";
                }
            });
          }
          this.userInfo=ret;
      }
      check(repairer,level){
          repairer.level=level;
          this.userDetail=repairer;
          if(level==2){
              this.userDetail.status=1;
          }
          this.updatepost();
      }
} 