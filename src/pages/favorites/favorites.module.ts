import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavoritesPage } from './favorites';
import { ComponentsModule } from "../../shared/components/components.module";

@NgModule({
  declarations: [
    FavoritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavoritesPage),
    ComponentsModule
  ],
})
export class FavoritesPageModule {}
