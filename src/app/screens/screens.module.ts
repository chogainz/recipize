import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChoicesComponent } from './choices/choices.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoredComponent } from './stored/stored/stored.component';
import { RecipeService } from './recipes/services/recipe.service';
import { HttpClientModule } from '@angular/common/http';
import { ListComponent } from './list/list.component';
import { ListService } from './list/services/list.service';
import { StoredService } from './stored/services/stored.service';
import { SharedModule } from '../shared/shared.module';
import { RecipesComponent } from './recipes/recipes/recipes.component';
import { RecipesDashboardComponent } from './recipes/recipes-dashboard.component';
import { ScanComponent } from './scan/scan.component';
import { ConfirmationDialogComponent } from './scan/dialogs/confirmation-dialog/confirmation-dialog.component';
import { StoredDashboardComponent } from './stored/stored-dashboard.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/services/login.service';
import { RecipesListComponent } from './recipes/recipes-list/recipes-list.component';

@NgModule({
  declarations: [
    LoginComponent,
    ChoicesComponent,
    RecipesDashboardComponent,
    RecipesComponent,
    StoredDashboardComponent,
    StoredComponent,
    ListComponent,
    ScanComponent,
    ConfirmationDialogComponent,
    RecipesListComponent
  ],
  entryComponents: [ConfirmationDialogComponent],
  providers: [
    RecipeService,
    ListService,
    StoredService,
    LoginService
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    HttpClientModule,
    SharedModule
  ],
  exports: [
    LoginComponent,
    ChoicesComponent,
    RecipesDashboardComponent,
    RecipesComponent,
    ListComponent,
    StoredDashboardComponent,
    StoredComponent,
    ScanComponent,
    RecipesListComponent
  ]
})
export class ScreensModule { }
