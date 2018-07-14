import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ReservationPage } from './reservation';
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
  declarations: [
    ReservationPage,
  ],
  imports: [
    IonicPageModule.forChild(ReservationPage),
    ComponentsModule
  ],
})
export class ReservationPageModule {}
