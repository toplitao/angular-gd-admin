import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
import { ListComponent} from './list/list.component';
import { LogisticsComponent} from './logistics/logistics.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
//import { PartnerGoodsSelectionComponent } from './partner-goods-selection/partner.goods.selection';
@NgModule({
    imports: [ExternalModule],
    declarations: [
       LogisticsComponent,
       ListComponent
    ],
    exports: [
        //PurchaseSaleListComponent,
    ]

})
export class OrderModule {
     
}
export const OrderRoutes :Routes =[
    {path:'list',component:ListComponent},
    {path:'logictics',component:LogisticsComponent},

]