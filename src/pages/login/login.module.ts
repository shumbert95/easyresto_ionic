import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Login } from './login'
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
    declarations: [
        Login,
    ],
    imports: [
        IonicPageModule.forChild(Login),
        ComponentsModule
    ],
    entryComponents: [
        Login
    ],
})
export class LoginModule {}