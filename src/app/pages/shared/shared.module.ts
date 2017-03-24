import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ExternalModule } from '../../external.module';
import { Zippy } from './zippy/zippy';
@NgModule({
    imports: [ExternalModule],
    declarations: [
        Zippy,
    ],
    exports: [
        Zippy,
    ]

})
export class SharedModule {

}
