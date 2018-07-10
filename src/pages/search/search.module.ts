import { NgModule } from '@angular/core';
import { Search } from './search'
import { IonicPageModule } from 'ionic-angular';
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
    declarations: [
        Search,
    ],
    imports: [
        ComponentsModule
    ],
    entryComponents: [
    ],
})
export class AccountPageModule {}