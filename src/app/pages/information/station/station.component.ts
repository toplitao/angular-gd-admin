import {Component,OnInit,OnDestroy} from '@angular/core';
import {Router} from '@angular/router';

import {ConfirmDialogModule,ConfirmationService} from 'primeng/primeng';
import {InformationService}from '../../../providers/services/information.service';
@Component({
    selector:'station',
    styleUrls: ['station.component.scss'],
    templateUrl: 'station.component.html',
     providers: [ConfirmationService]
})
export class StationComponent implements OnInit{
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
       
       constructor(private stationservice:InformationService,private confirmationService: ConfirmationService){
            this.images = [];
            this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos1.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos1_small.jpg', title:'Sopranos 1'});
            this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos2.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos2_small.jpg', title:'Sopranos 2'});
        this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos3.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos3_small.jpg', title:'Sopranos 3'});
        this.images.push({source:'showcase/resources/demo/images/sopranos/sopranos4.jpg', thumbnail: 'showcase/resources/demo/images/sopranos/sopranos4_small.jpg', title:'Sopranos 4'});
       }

      async ngOnInit(){
           this.Show.tableshow=true;
           this.userList();
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
            let msg=await this.stationservice.stationdel(params);
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
              this.userInfo=msg.data;
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