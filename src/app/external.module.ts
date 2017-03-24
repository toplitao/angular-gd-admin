import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { CustomReuseStrategy } from './providers/strategy/CustomReuseStrategy';
import {
    MenuModule,
    DropdownModule,
    PanelMenuModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    InputTextareaModule,
    OverlayPanelModule,
    AccordionModule,
    SpinnerModule,
    ButtonModule,
    PaginatorModule,
    DataTableModule,
    SharedModule,
    FieldsetModule,
    CalendarModule,
    FileUploadModule,
    EditorModule,
    InputMaskModule,
    PanelModule,
    CheckboxModule,
    InputTextModule,
    DialogModule,
    SelectButtonModule,
    GrowlModule,
    TabViewModule,
    TabMenuModule,
    MenuItem,
    ToolbarModule,
    ToggleButtonModule,
    LightboxModule
} from 'primeng/primeng';
import { TreeModule } from 'angular-tree-component';//angular-tree-component

//angular 必须模块
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

let importAndExportModules = [
    CommonModule,
    FormsModule,
    MenuModule,
    PanelMenuModule,
    DropdownModule,
    AutoCompleteModule,
    ConfirmDialogModule,
    InputTextareaModule,
    OverlayPanelModule,
    AccordionModule,
    SpinnerModule,
    ButtonModule,
    PaginatorModule,
    DataTableModule,
    SharedModule,
    FieldsetModule,
    CalendarModule,
    FileUploadModule,
    EditorModule,
    InputMaskModule,
    PanelModule,
    CheckboxModule,
    InputTextModule,
    DialogModule,
    SelectButtonModule,
    GrowlModule,
    TabViewModule,
    TabMenuModule,
    ToolbarModule,
    ToggleButtonModule,
    TreeModule,
    LightboxModule
]

@NgModule({
    imports: [
        ...importAndExportModules
    ],
    declarations: [
    ],
    providers: [
        //    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }
    ],
    exports: [
        ...importAndExportModules
    ],
})
export class ExternalModule {

}
