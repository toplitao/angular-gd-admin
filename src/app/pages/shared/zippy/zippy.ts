import {Component,Output,EventEmitter,Input} from '@angular/core';

@Component({
    selector: 'zippy',
    styleUrls: ['zippy.scss'],
    templateUrl: 'zippy.html'
})
export class Zippy {
    @Input('loader') loader: boolean;
    @Input('isShow') isShow: boolean;
    @Input('cancel') cancel: boolean;
    @Output('open') open: EventEmitter<any> = new EventEmitter();
    click(e) {
        // if(this.cancel === true){ 
        //     return 
        // }
        // if(e.path[0].id != 'zippy'){
        //     e.stopPropagation();
        //     return;
        // }
        this.isShow = !this.isShow;
        this.open.emit(this.isShow);
    }
}
