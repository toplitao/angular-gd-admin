import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class FilesService {
    private apis: any = {
        file_del:'common/file-delete',
    };

    constructor(private api: Api) {

    }

    public delete(params){
         return this.api.post(this.apis.file_del,params).toPromise();
    }
}
