import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class InformationService {
    private apis: any = {
        stationlist: 'information/station',
        stationadd:'information/station/add',
        stationupdate:'information/station/update',
        stationdel:'information/station/del',
        stationsearch:'information/station/search',


        documentarylist: 'information/documentary',
        documentaryadd:'information/documentary/add',
        documentaryupdate:'information/documentary/update',
        documentarydel:'information/documentary/del',
        documentarysearch:'information/documentary/search',

    };

    constructor(private api: Api) {

    }

    public stationlist(){
        return this.api.get(this.apis.stationlist).toPromise();
    }
    public stationadd(params){
        return this.api.post(this.apis.stationadd,params).toPromise();
    }
    public stationupdate(params){
        return this.api.post(this.apis.stationupdate,params).toPromise();
    }
    public stationdel(params){
         return this.api.get(this.apis.stationdel,params).toPromise();
    }
    public stationsearch(params){
        return this.api.get(this.apis.stationsearch,params).toPromise();
    }



    public documentarylist(){
        return this.api.get(this.apis.documentarylist).toPromise();
    }
    public documentaryadd(params){
        return this.api.post(this.apis.documentaryadd,params).toPromise();
    }
    public documentaryupdate(params){
        return this.api.post(this.apis.documentaryupdate,params).toPromise();
    }
    public documentarydel(params){
         return this.api.get(this.apis.documentarydel,params).toPromise();
    }
    public documentarysearch(params){
        return this.api.get(this.apis.documentarysearch,params).toPromise();
    }

}
