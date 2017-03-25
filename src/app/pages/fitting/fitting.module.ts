import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
import { ListComponent} from './list/fitting.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
//import { PartnerGoodsSelectionComponent } from './partner-goods-selection/partner.goods.selection';
@NgModule({
    imports: [ExternalModule],
    declarations: [
     ListComponent
    ],
    exports: [
        //PurchaseSaleListComponent,
    ]

})
export class FittingModule {
     
}
export const FittingRoutes :Routes =[
    {path:'list',component:ListComponent},

]