import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
import {MemberComponent} from './member/member.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
//import { PartnerGoodsSelectionComponent } from './partner-goods-selection/partner.goods.selection';
@NgModule({
    imports: [ExternalModule],
    declarations: [
       MemberComponent
    ],
    exports: [
        //PurchaseSaleListComponent,
    ]

})
export class UserModule {
     
}
export const UserRoutes :Routes =[
    {path:'member',component:MemberComponent},

]