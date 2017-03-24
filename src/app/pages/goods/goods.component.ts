import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {GoodsService}from '../../providers/services/goods.service';
@Component({
    selector:'goods',
    styleUrls: ['goods.component.scss'],
    templateUrl: 'goods.component.html',
     providers: [ConfirmationService]
})
export class GoodsComponent implements OnInit{
       public Show:any=[
           {'dialog':false,'tableshow':true,'cshow':false,'addshow':false,'updateshow':false}
           ]
       public listType=[
           {label:"列表1",value:true},{label:"列表2",value:false}];
       public msgs:any=[];
       public userDetail:any=[];
       private userInfo:any=[];
       private selected:any;
       private search:any={id:null,name:null};
       
       constructor(private goodsservice:GoodsService,private confirmationService: ConfirmationService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.userInfo=await this.goodsservice.goodsList();
       }
      async userList(){
           this.userInfo=await this.goodsservice.goodsList();
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
            let msg=await this.goodsservice.goodsUpdate(this.userDetail);
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
               let msg=await this.goodsservice.goodsAdd(this.userDetail);
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
            let msg=await this.goodsservice.goodsDel(params);
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
          let msg=await this.goodsservice.goodsDel(params);
          if(msg.status==1){
              this.userInfo=msg.data;
          }

      }
     async onsearch(){
         
          let ret=await this.goodsservice.goodsSearch(this.search); console.log('1',this.search);
          this.userInfo=ret;
      }

    
    selectedGood;
    showType;
    displayDialog: boolean;

    
    selectedGoods(good,showType) {
        console.log(good);
        this.selectedGood = good;
        this.showType=showType;
        this.displayDialog = true;
    }
    
    onDialogHide() {
        this.selectedGood = null;
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
    asd(e){
        console.log(e);
    }
} 