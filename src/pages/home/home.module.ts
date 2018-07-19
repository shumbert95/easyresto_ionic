import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Home } from './home';
import { ComponentsModule } from "../../shared/components/components.module";

@NgModule({
  declarations: [
      Home,
  ],
  imports: [
    IonicPageModule.forChild(Home),
    ComponentsModule
  ],
})
export class HomeModule {}
