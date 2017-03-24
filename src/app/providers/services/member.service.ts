import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class MemberService {
    private apis: any = {
        memberlist: 'user/member',
        memberadd:'user/member/add',
        memberupdate:'user/member/update',
        memberdel:'user/member/del',
        membersearch:'user/member/search',


        repairerlist: 'user/repairer',
        repaireradd:'user/repairer/add',
        repairerupdate:'user/repairer/update',
        repairerdel:'user/repairer/del',
        repairersearch:'user/repairer/search',
    };

    constructor(private api: Api) {

    }

    public memberlist(){
        return this.api.get(this.apis.memberlist).toPromise();
    }
    public memberadd(params){
        return this.api.post(this.apis.memberadd,params).toPromise();
    }
    public memberupdate(params){
        return this.api.post(this.apis.memberupdate,params).toPromise();
    }
    public memberdel(params){
         return this.api.get(this.apis.memberdel,params).toPromise();
    }
    public membersearch(params){
        return this.api.get(this.apis.membersearch,params).toPromise();
    }


    public repairerlist(){
        return this.api.get(this.apis.repairerlist).toPromise();
    }
    public repaireradd(params){
        return this.api.post(this.apis.repaireradd,params).toPromise();
    }
    public repairerupdate(params){
        return this.api.post(this.apis.repairerupdate,params).toPromise();
    }
    public repairerdel(params){
         return this.api.get(this.apis.repairerdel,params).toPromise();
    }
    public repairersearch(params){
        return this.api.get(this.apis.repairersearch,params).toPromise();
    }
}
