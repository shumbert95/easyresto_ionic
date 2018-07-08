import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: 'header.html',
    inputs: ['title', 'menu', 'filters']
})
export class HeaderComponent{
    @Input('title') title: string;
    @Input('menu') menu: string;
}
