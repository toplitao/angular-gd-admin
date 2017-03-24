import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
import { StationComponent} from './station/station.component';
import { RepairerComponent} from './repairer/repairer.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
//import { PartnerGoodsSelectionComponent } from './partner-goods-selection/partner.goods.selection';
@NgModule({
    imports: [ExternalModule],
    declarations: [
       StationComponent,
       RepairerComponent
    ],
    exports: [
        //PurchaseSaleListComponent,
    ]

})
export class InformationModule {
     
}
export const InformationRoutes :Routes =[
    {path:'station',component:StationComponent},
    {path:'repairer',component:RepairerComponent},

]