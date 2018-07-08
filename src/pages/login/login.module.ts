import { NgModule } from '@angular/core';
import { Login } from './login'
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
    declarations: [
        Login,
    ],
    imports: [
        ComponentsModule
    ],
    entryComponents: [
    ],
})
export class AccountPageModule {}