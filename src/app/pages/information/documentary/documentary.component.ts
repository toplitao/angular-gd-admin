import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {InformationService}from '../../../providers/services/information.service';
@Component({
    selector:'documentary',
    styleUrls: ['documentary.component.scss'],
    templateUrl: 'documentary.component.html',
    providers: [ConfirmationService]
})
export class DocumentaryComponent implements OnInit{
       public Show:any=[
           {'dialog':false,'tableshow':true,'cshow':false,'addshow':false,'updateshow':false}
           ]
       public listType=[
           {label:"列表1",value:true},{label:"列表2",value:false}];
       public msgs:any=[];
       public showType:any;
       public displayDialog:boolean=false;
       public images:any;
       public selectedPic:any;
       public selectedPicShow:boolean=false;
       public userDetail:any=[];
       private userInfo:any=[];
       private selected:any;
       private selectedRow:any
       private search:any={id:null,name:null};
       
       constructor(private documentaryservice:InformationService,private confirmationService: ConfirmationService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.userList();
       }
      async userList(){
           this.userInfo=await this.documentaryservice.documentarylist();
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
            let msg=await this.documentaryservice.documentaryupdate(this.userDetail);
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
               let msg=await this.documentaryservice.documentaryadd(this.userDetail);
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
                    name:null,
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
            let msg=await this.documentaryservice.documentarydel(params);
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
          let msg=await this.documentaryservice.documentarydel(params);
          if(msg.status==1){
              this.userInfo=msg.data;
          }

      }
     async onsearch(){
         
          let ret=await this.documentaryservice.documentarysearch(this.search); console.log('1',this.search);
          this.userInfo=ret;
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
       lmsgs:any=[];
       uploadedFiles: any[] = [];
        onUpload(event) {
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
    
        this.lmsgs = [];
        this.lmsgs.push({severity: 'info', summary: 'File Uploaded', detail: ''});
        }
       selectedGoods(documentary,showType) {
        console.log(documentary);
        this.selectedRow = documentary;
        this.showType=showType;
        this.displayDialog = true;
    }
    open(e){
        console.log(e);
        this.selectedPicShow=e;
    }
} 