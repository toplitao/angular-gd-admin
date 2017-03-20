import { Component , ViewEncapsulation } from '@angular/core';
@Component({
    selector: 'app',
    styleUrls: ['app.scss'],
    encapsulation: ViewEncapsulation.None,
    template: '<router-outlet></router-outlet>'
})
export class AppComponent {
}
