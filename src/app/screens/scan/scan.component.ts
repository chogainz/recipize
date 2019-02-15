import { Component, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmationDialogComponent } from './dialogs/confirmation-dialog/confirmation-dialog.component';
import { ListService } from '../list/services/list.service';
import { StoredService } from '../stored/services/stored.service';
import { ToastrService } from 'ngx-toastr';
import { mergeMap } from 'rxjs/operators';
import { RecipeService } from '../recipes/services/recipe.service';


@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent {

  private _storedService: StoredService;
  private _recipeService: RecipeService;
  private _toastr: ToastrService;

  constructor(
    public dialog: MatDialog,
    storedService: StoredService,
    recipeService: RecipeService,
    toastr: ToastrService) {
    this._toastr = toastr;
    this._storedService = storedService;
    this._recipeService = recipeService;
  }

  public scan(): void {
    this.openDialog();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '100vw',
      data: {},
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.saveLocation === 'stored') {
        this._storedService.addToStoredByBarcode(JSON.stringify({
          barcode: '5054070637104',
          userId: 1
        })).pipe(mergeMap(() => this._recipeService.checkMissingIngredientsAllRecipes(JSON.stringify({
          userId: 1,
          recipeId: 1,
          queryMethod: 'missingIngredientsAllRecipes'
        })))).subscribe((response: any) => {

          const filtered = [...response
            .filter((result: any) => result.numberOfMissingItems === 0)
            .map((result: any) => result.title)];
          let notificationMessage: string;
          if (filtered.length > 0) {

            notificationMessage = `
             ${filtered.map((title: string) => `<p>${title}</p>`)}
           `;

          } else {
            notificationMessage = 'Butter beans added to stored items'
          }
          this._toastr.success(notificationMessage, 'Complete recipes', {
            toastClass: 'toast',
            closeButton: true,
            enableHtml: true
          });
        })
      }
    });
  }
}
