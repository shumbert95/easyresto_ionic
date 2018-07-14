import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentDetailsPage } from './content-details';
import {ComponentsModule} from "../../shared/components/components.module";

@NgModule({
  declarations: [
    ContentDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentDetailsPage),
    ComponentsModule
  ],
})
export class ContentDetailsPageModule {}
