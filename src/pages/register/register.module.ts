import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Register } from './register';
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
    declarations: [
        Register,
    ],
    imports: [
        IonicPageModule.forChild(Register),
        ComponentsModule
    ],
})
export class RegisterModule {}