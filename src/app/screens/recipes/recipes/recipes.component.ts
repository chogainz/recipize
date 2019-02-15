import { Component, OnInit, Input } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { ListService } from '../../list/services/list.service';
import { ISwipeEvent } from 'src/app/shared/directives/swipe-off.directive';
import { mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ScreenService, IScreenState } from 'src/app/shared/services/screen.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})

export class RecipesComponent implements OnInit {
  public stepNum = 0;
  public recipes: Array<any> = [];
  public selectedRecipe: any;
  public pageLoading = true;

  private _query: string;
  private _toastr: ToastrService;
  private _recipeService: RecipeService;
  private _listService: ListService;
  private _screenService: ScreenService;

  constructor(
    recipeService: RecipeService,
    screenService: ScreenService,
    listService: ListService,
    toastr: ToastrService) {
    this._toastr = toastr;
    this._recipeService = recipeService;
    this._listService = listService;
    this._screenService = screenService;
  }

  ngOnInit() {
    this._screenService.updateScreen
      .subscribe((screenState: IScreenState) => {
        if (screenState.panels.right === 'recipeSwipe') {
          this._query = screenState.query;
          this.selectedRecipe = false;
          this.getAllRecipes();
        }
      })
  }

  public swiping(event: ISwipeEvent, index: number) {
    this.recipes[index].isSwiping = true;
    this.recipes[index].swipedOff = event.swipedOff;
  }

  public shuffle(arr: any): Array<any> {
    var ctr = arr.length, temp, index;
    while (ctr > 0) {
      index = Math.floor(Math.random() * ctr);
      ctr--;
      temp = arr[ctr];
      arr[ctr] = arr[index];
      arr[index] = temp;
    }
    return arr;
  }

  public getAllRecipes(): void {

    this._recipeService
      .getRecipes(JSON.stringify({
        userId: 1,
        queryMethod: this._query
      }))
      .subscribe((response: any) => {
        setTimeout(() => this.pageLoading = false, 100);
        this.recipes = response.results;
        if (this._query === 'recipesFromPotluck') {
          this.recipes = this.shuffle(this.recipes);
        }
        this.recipes.map((recipe: any) => {
          return { ...recipe, isSwiping: false, swipedOff: false }
        });
      });
  }

  public end(event: ISwipeEvent, recipe: any, index: number) {

    this.recipes[index].isSwiping = false;

    if (event.swipedOff) {
      if (event.ref) { event.ref.nativeElement.parentElement.removeChild(event.ref.nativeElement); }
      this.recipes.pop();
    }

    if (this.recipes.length === 0) {
      this.pageLoading = true;
      setTimeout(() => this.getAllRecipes(), 1000);
    }
    if (event.swipeDirection === 'right') {

      let notificationMessage: string;

      this._recipeService.saveRecipe(JSON.stringify({
        userId: 1,
        recipeId: recipe.recipeId,
        queryMethod: 'saveRecipe'
      }))
        .pipe(mergeMap(() =>
          this._recipeService.checkMissingIngredients(JSON.stringify({
            userId: 1,
            recipeId: recipe.recipeId,
            queryMethod: 'missingIngredients'
          }))
        ),

          mergeMap((response: any) => {
            if (response[0].numberOfMissingItems > 0) {
              return this._listService.addListItem(JSON.stringify({ userId: 1, recipeId: recipe.recipeId }))
            } else {
              let notificationMessage: string;
              notificationMessage = recipe.title;
              this._toastr.success(notificationMessage, 'Complete recipe', {
                toastClass: 'toast',
                closeButton: true
              });
              return of(null);
            }
          })).subscribe((response) => {
            if (response) {
              notificationMessage = `Recipe saved ${response.affectedRows > 0 ? 'and shopping list updated' : ''}`;
              this._toastr.info(notificationMessage, 'Update', {
                toastClass: 'toast',
                closeButton: true
              });
            }
          });
    }
  }

  public viewRecipe(recipe: any): void {
    this._recipeService
      .getRecipeInstructions(JSON.stringify({
        recipeId: recipe.recipeId,
        queryMethod: 'steps'
      }))
      .subscribe((response: any) => this.selectedRecipe = response.results);
  }
}
