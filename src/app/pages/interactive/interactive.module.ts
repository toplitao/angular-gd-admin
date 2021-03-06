import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
import { HelpComponent} from './help/help.component';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';
//import { PartnerGoodsSelectionComponent } from './partner-goods-selection/partner.goods.selection';
@NgModule({
    imports: [ExternalModule,SharedModule,FroalaEditorModule, FroalaViewModule],
    declarations: [
       HelpComponent,
    ],
    exports: [
        //PurchaseSaleListComponent,
    ]

})
export class InteractiveModule {
     
}
export const InteractiveRoutes :Routes =[
    {path:'help',component:HelpComponent},


]