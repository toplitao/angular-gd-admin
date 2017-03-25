import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
import { StationComponent} from './station/station.component';
import { DocumentaryComponent} from './documentary/documentary.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

//import { PartnerGoodsSelectionComponent } from './partner-goods-selection/partner.goods.selection';
@NgModule({
    imports: [ExternalModule,SharedModule],
    declarations: [
       StationComponent,
       DocumentaryComponent,
    ],
    exports: [
        //PurchaseSaleListComponent,
    ]

})
export class InformationModule {
     
}
export const InformationRoutes :Routes =[
    {path:'station',component:StationComponent},
    {path:'documentary',component:DocumentaryComponent},

]