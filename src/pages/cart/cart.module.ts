import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CartPage } from './cart';
import { ComponentsModule } from "../../shared/components/components.module";

@NgModule({
  declarations: [
    CartPage,
  ],
  imports: [
    IonicPageModule.forChild(CartPage),
    ComponentsModule
  ],
})
export class CartPageModule {}
