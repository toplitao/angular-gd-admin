import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageLayoutComponent, HeaderComponent, FooterComponent, TabMenuComponent } from './index';
import { ExternalModule } from '../../external.module';
import { Menu } from './menu.list';
import { AuthService } from '../../providers/services/auth.service';
@NgModule({
    imports: [ExternalModule, RouterModule, CommonModule, FormsModule],
    declarations: [
        PageLayoutComponent,
        HeaderComponent,
        FooterComponent,
        TabMenuComponent
    ],
    entryComponents: [
        PageLayoutComponent,
    ],
    providers: [
        Menu,
        AuthService,
    ],
    exports: [
        PageLayoutComponent,
    ]
})
export class LayoutModule {

}
