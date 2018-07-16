import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmationPage } from './confirmation';
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
  declarations: [
    ConfirmationPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmationPage),
    ComponentsModule
  ],
})
export class ConfirmationPageModule {}
