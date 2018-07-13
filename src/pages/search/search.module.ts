import { NgModule } from '@angular/core';
import { Search } from './search'
import { IonicPageModule } from 'ionic-angular';
import {ComponentsModule} from "../../shared/components/components.module";
import { BarRatingModule } from "ngx-bar-rating";


@NgModule({
    declarations: [
        Search,
    ],
    imports: [
        IonicPageModule.forChild(Search),
        ComponentsModule,
        BarRatingModule
    ],
    entryComponents: [
    ],
})
export class SearchModule {}