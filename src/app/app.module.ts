// angular2组件
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

// 外部全局模块
import { ExternalModule } from './external.module';
// app路由和app组件和模块和服务
import { AppRoutingModule, AppComponents, AppModules, AppServices } from './app.router.module';
import { AppComponent }  from './app.component';
import { SharedModule } from './pages/shared/shared.module';

import "froala-editor/js/froala_editor.pkgd.min.js";

import { FroalaEditorModule, FroalaViewModule } from 'angular2-froala-wysiwyg';

@NgModule({
    imports: [
        FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
        BrowserModule,
        CommonModule,
        HttpModule,
        JsonpModule,
        FormsModule,
        ExternalModule,
        AppModules,
        AppRoutingModule,
        SharedModule
    ],
    providers: [
        AppServices
    ],
    declarations: [
        AppComponent,
        AppComponents,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
