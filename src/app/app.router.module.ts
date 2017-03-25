import { NgModule } from '@angular/core';
import { RouterModule, Routes, RouteReuseStrategy } from '@angular/router';
// import { CustomReuseStrategy } from './providers/strategy/CustomReuseStrategy';
// 导入服务
import {
    AuthHandler,
    AuthGuard,
    AuthService,
    Api,

    UserService,
    MemberService,
    GoodsService,
    OrderService,
    FittingService,
    InformationService,
    FilesService,
    DocumentaryService,
} from './providers';

// 导入页面组件或模块
import {
    DefaultComponent,
    LoginComponent,
    GoodsComponent,

    UserModule,
    UserRoutes,

    OrderModule,
    OrderRoutes,

    FittingModule,
    FittingRoutes,

    InformationModule,
    InformationRoutes,

    InteractiveModule,
    InteractiveRoutes,

    SharedModule
    // InfoModule,
    // InfoModuleRoutes

} from './pages';

// 导入框架页和框架模块
import { PageLayoutComponent } from './global/layout';
import { LayoutModule } from './global/layout/layout.module';
// ==============================================================
// 用于统一导出整个项目的页面Compoment到 module
export const AppComponents: any[] = [
    DefaultComponent,
    LoginComponent,
    GoodsComponent,
    //PurchaseComponent,
];
// 用于统一导出整个项目的Module到 module
export const AppModules: any[] = [
    LayoutModule,
    UserModule,
    OrderModule,
    FittingModule,
    InformationModule,
    InteractiveModule,
    SharedModule
];
// 用于统一导出整个项目的Service到 module
export const AppServices: any[] = [
    Api,
    AuthService,
    AuthHandler,
    AuthGuard,
    UserService,
    MemberService,
    GoodsService,
    OrderService,
    FittingService,
    InformationService,
    FilesService,
    DocumentaryService,
    // {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
];
// ===============================================================
// 系统路由
const routes: Routes = [
    {
        path: '',
        component: PageLayoutComponent,
        canActivateChild: [AuthGuard],
        children: [
            { path: '', component: DefaultComponent },
            { path: 'user', children: UserRoutes },
            { path: 'goods', component: GoodsComponent },
            { path: 'order', children: OrderRoutes },
            { path: 'fitting', children: FittingRoutes },
            { path: 'information', children: InformationRoutes },
            { path: 'interactive', children: InteractiveRoutes },
            //{ path: 'basicinfo', children: InfoModuleRoutes },

        ]
    },
    { path: 'login', component: LoginComponent },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: true }), 
    UserModule,
    OrderModule,
    FittingModule,
    InformationModule,
    InteractiveModule,
    SharedModule
    //InfoModule,
    ],
    exports: [RouterModule, 
    UserModule,
    OrderModule,
    FittingModule,
    InformationModule,
    InteractiveModule,
    SharedModule

    //InfoModule
    ]
})
export class AppRoutingModule {

}
