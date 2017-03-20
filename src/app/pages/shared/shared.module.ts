import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
//import { PartnerGoodsSelectionComponent } from './partner-goods-selection/partner.goods.selection';
@NgModule({
    imports: [ExternalModule],
    declarations: [
        //PurchaseSaleListComponent,
    ],
    exports: [
        //PurchaseSaleListComponent,
    ]

})
export class SharedModule {

}
