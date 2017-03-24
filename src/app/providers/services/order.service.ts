import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class OrderService {
    private apis: any = {
        orderlist: 'order/list',
        ordersearch:'order/list/search',
        readorder:'order/list/readorder',

        selectrepairer:'order/list/selectedrepairer',
        repairersearch:'user/repairer/distribution',
    };

    constructor(private api: Api) {

    }

    public orderlist(){
        return this.api.get(this.apis.orderlist).toPromise();
    }

    public readorder(params){
         return this.api.get(this.apis.readorder,params).toPromise();
    }
    public ordersearch(params){
        return this.api.get(this.apis.ordersearch,params).toPromise();
    }


    public repairersearch(){
        return this.api.get(this.apis.repairersearch).toPromise();
    }
    public selectedrepairer(params){
         return this.api.get(this.apis.selectrepairer,params).toPromise();
    }
}
