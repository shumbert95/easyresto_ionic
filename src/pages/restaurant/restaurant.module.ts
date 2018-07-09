import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Restaurant } from './restaurant';
import {ComponentsModule} from "../../shared/components/components.module";


@NgModule({
  declarations: [
    Restaurant,
  ],
  imports: [
    IonicPageModule.forChild(Restaurant),
    ComponentsModule
  ],
})
export class RestaurantModule {}
