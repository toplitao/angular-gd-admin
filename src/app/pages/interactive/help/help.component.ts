import {Component,OnInit,OnDestroy,EventEmitter,Output} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {HelpService}from '../../../providers/services/help.service';
import {FilesService}from '../../../providers/services';
import {EditorModule,SharedModule} from 'primeng/primeng';
import { Config } from '../../../config';
@Component({
    selector:'station',
    styleUrls: ['help.component.scss'],
    templateUrl: 'help.component.html',
     providers: [ConfirmationService]
})
export class HelpComponent implements OnInit{
       public baseUrl = Config.baseUrl;
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
        @Output() froala = new EventEmitter();
        options:Object;
        froalaText:string;
       
       constructor(private stationservice:HelpService,private confirmationService: ConfirmationService,private filesService:FilesService){
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.userList();
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
           this.userInfo=await this.stationservice.stationlist();console.log('11',this.userInfo);
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
            let msg=await this.stationservice.stationupdate(this.userDetail);
            if(msg.status==1){
                this.userInfo=msg.data;
                this.Show.cshow=false;
                let msgs={severity:'info', summary:'提示', detail:'修改成功'};
                this.msg(msgs);
                this.userList();
            }else{
                let msgs={severity:'error', summary:'提示', detail:'修改失败'};
                this.msg(msgs);
            }
       }
      async add(postdata?:any){
           if(postdata){
               let msg=await this.stationservice.stationadd(this.userDetail);
               if(msg.status==1){
                   this.userInfo=msg.data;
                   let msgs={severity:'info', summary:'提示', detail:'添加成功'};
                   this.msg(msgs);
                   this.userList();
               }else{
                   let msgs={severity:'error', summary:'提示', detail:'添加失败'};
                   this.msg(msgs);
               }
               this.Show.cshow=false;
           }else{
                this.userDetail={
                    id:null,
                    title:null,
                    author:null,
                    content:null,
                };
                this.Show.cshow=true
                this.Show.addshow=true;
                this.Show.updateshow=false;
           }
           
           
       }
       async del(data){
            let params={id:data.id};
            let msg=await this.stationservice.stationdel(params);
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
          let msg=await this.stationservice.stationdel(params);
          if(msg.status==1){
              this.userList();
          }

      }
     async onsearch(){
         
          let ret=await this.stationservice.stationsearch(this.search); console.log('1',this.search);
          this.userInfo=ret;
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
       selectedGoods(station,showType) {
        console.log(station);
        this.selectedRow = station;
        this.showType=showType;
        this.displayDialog = true;
    }
    open(e){
        console.log(e);
        this.selectedPicShow=e;
    }
} 