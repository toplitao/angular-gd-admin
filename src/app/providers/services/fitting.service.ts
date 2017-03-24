import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class FittingService {
    private apis: any = {
        orderlist: 'fitting/list',
        orderadd:'fitting/list/add',
        orderupdate:'fitting/list/update',
        orderdel:'fitting/list/del',
        ordersearch:'fitting/list/search',


        // repairerlist: 'user/repairer',
        // repaireradd:'user/repairer/add',
        // repairerupdate:'user/repairer/update',
        // repairerdel:'user/repairer/del',
        // repairersearch:'user/repairer/search',
    };

    constructor(private api: Api) {

    }

    public fittinglist(){
        return this.api.get(this.apis.orderlist).toPromise();
    }
    public fittingadd(params){
        return this.api.post(this.apis.orderadd,params).toPromise();
    }
    public fittingupdate(params){
        return this.api.post(this.apis.orderupdate,params).toPromise();
    }
    public fittingdel(params){
         return this.api.get(this.apis.orderdel,params).toPromise();
    }
    public fittingsearch(params){
        return this.api.get(this.apis.ordersearch,params).toPromise();
    }
}
