import {Component,OnInit,OnDestroy,EventEmitter,Output} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {GoodsService,FilesService}from '../../providers/services';
import { Config } from '../../config';
@Component({
    selector:'goods',
    styleUrls: ['goods.component.scss'],
    templateUrl: 'goods.component.html',
     providers: [ConfirmationService]
})
export class GoodsComponent implements OnInit{
        public baseUrl = Config.baseUrl;
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

        @Output() froala = new EventEmitter();
        options:Object;
        froalaText:string;
       constructor(private goodsservice:GoodsService,private confirmationService: ConfirmationService,
       private filesService:FilesService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.userInfo=await this.goodsservice.goodsList();
           var that = this;
           this.options = {
                language: "zh_cn", //配置语言
                height:400,
                imageUploadURL:this.baseUrl+'common/file-upload',
                imageUploadParam:'file',
                imageUploadParams:{
                    id:1,
                    dir:'goods/help',
                    table:'Goods',
                    filed:'help',
                    type:'froalaEditor'
                },
                placeholderText: "请输入内容", // 文本框提示内容
                charCounterCount: true, // 是否开启统计字数
                charCounterMax: 200, // 最大输入字数,目前只支持英文字母
                // 注意导航条的配置, 按照官方的文档,无法配置,只能使用toolbarButtons来配置了。
                toolbarButtons: ['fullscreen', '|', 'bold', 'italic', 'underline', 'strikeThrough', 'align', 'insertLink', 'insertImage', 'insertHR', 'subscript', 'superscript'],
                codeMirror: false, // 高亮显示html代码
                codeMirrorOptions: { // 配置html代码参数
                    tabSize: 4
                },
                // 事件, 每次输入,就将值传递给父组件, 或者使用失去焦点的时候传递。
                events: {
                    'froalaEditor.keyup': function (e, editor) {
                     //that.froala.emit(that.selectedGood.help);
                     //console.log(that.selectedGood.help);
                    //console.log(editor.selection.get());
                    }
                }
            }
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

    
    async selectedGoods(good,showType) {
        this.userInfo=await this.goodsservice.goodsList();
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
        console.log(event.xhr);
        for(let file of event.files) {
            this.uploadedFiles.push(file);
        }
        let ret=eval('(' + event.xhr.response + ')')
        this.selectedGood=ret;
        console.log(this.selectedGood);
        this.lmsgs = [];
        this.lmsgs.push({severity: '信息', summary: '上传成功', detail: ''});
    }
    async deleteDoc(path,id){
        let ret=await this.filesService.delete({path:path,id:id,table:'Goods',filed:'doc'});
        if(ret.id){
            this.selectedGood=ret;
        }
    }
    async deletePic(path,id){
        let ret=await this.filesService.delete({path:path,id:id,table:'Goods',filed:'picture'});
        if(ret.id){
            this.selectedGood=ret;
        }
    }
    images: any[];

    selectedPic:any;
    selectedPicShow:boolean=false;
    open(e){
        this.selectedPicShow=e;
    }
    updateHelp(){
        this.goodsservice.goodsUpdate({id:this.selectedGood.id,help:this.selectedGood.help});
    }
    updateMaintain(){
        this.goodsservice.goodsUpdate({id:this.selectedGood.id,maintain:this.selectedGood.maintain});
    }
} 