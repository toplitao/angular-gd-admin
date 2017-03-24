import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Api } from './api';

@Injectable()
export class GoodsService {
    private apis: any = {
        goods_list: 'goods',
        goods_add:'goods/add',
        goods_update:'goods/update',
        goods_del:'goods/del',
        goods_search:'goods/search',
    };

    constructor(private api: Api) {

    }

    public goodsList(){
        return this.api.get(this.apis.goods_list).toPromise();
    }
    public goodsAdd(params){
        return this.api.post(this.apis.goods_add,params).toPromise();
    }
    public goodsUpdate(params){
        return this.api.post(this.apis.goods_update,params).toPromise();
    }
    public goodsDel(params){
         return this.api.get(this.apis.goods_del,params).toPromise();
    }
    public goodsSearch(params){
        return this.api.get(this.apis.goods_search,params).toPromise();
    }
}
