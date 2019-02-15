import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidePanelComponent } from './components/slide-panel/slide-panel.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScreenService } from './services/screen.service';
import { SwipeOffDirective } from './directives/swipe-off.directive';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


const MaterialImports = [
  MatProgressSpinnerModule,
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule,
  MatSidenavModule,
  MatListModule,
  MatDividerModule,
  MatDialogModule,
  MatInputModule
];

@NgModule({
  declarations: [
    SlidePanelComponent,
    SwipeOffDirective],
  imports: [
    CommonModule,
    FlexLayoutModule,
    ToastrModule.forRoot({ timeOut: 50000, maxOpened: 1, autoDismiss: true }),
    ...MaterialImports,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ScreenService],
  exports: [
    SlidePanelComponent,
    SwipeOffDirective,
    ToastrModule,
    ...MaterialImports,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
