import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import {IonicModule} from "ionic-angular";
import {BarRatingModule} from "ngx-bar-rating";
import {AddToCartComponent} from "./addToCart/addToCart";


@NgModule({
    declarations: [
        HeaderComponent,
        AddToCartComponent
    ],
    imports: [IonicModule, BarRatingModule],
    exports: [
        HeaderComponent,
        AddToCartComponent
    ]
})
export class ComponentsModule {}