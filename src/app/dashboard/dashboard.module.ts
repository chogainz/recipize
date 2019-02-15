import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';
import { ScreensModule } from '../screens/screens.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, FlexLayoutModule, SharedModule, ScreensModule]
})
export class DashboardModule {}
