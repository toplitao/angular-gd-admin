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

}
