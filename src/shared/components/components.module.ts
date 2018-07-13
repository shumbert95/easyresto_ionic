import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import {IonicModule} from "ionic-angular";
import {BarRatingModule} from "ngx-bar-rating";


@NgModule({
    declarations: [
        HeaderComponent,
    ],
    imports: [IonicModule, BarRatingModule],
    exports: [
        HeaderComponent,
    ]
})
export class ComponentsModule {}