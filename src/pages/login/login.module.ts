import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login'
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
    declarations: [
        LoginPage,
    ],
    imports: [
        IonicPageModule.forChild(AccountPage),
        ComponentsModule
    ],
    entryComponents: [
    ],
})
export class AccountPageModule {}