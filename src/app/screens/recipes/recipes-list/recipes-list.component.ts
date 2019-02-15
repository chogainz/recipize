import { Component, OnInit, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecipeService } from '../services/recipe.service';
import { forkJoin } from 'rxjs';
import { ISwipeEvent } from 'src/app/shared/directives/swipe-off.directive';
import { StoredService } from '../../stored/services/stored.service';
import { ScreenService, IScreenState } from 'src/app/shared/services/screen.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {

  public stepNum = 0;
  public recipes: Array<any> = [];
  public filteredRecipes: Array<any> = [];
  public selectedRecipe: any;
  public viewRecipeInfo: boolean = false;
  public pageLoading = true;
  public searchString: string;
  public query: string;

  private _toastr: ToastrService;
  private _recipeService: RecipeService;
  private _storedService: StoredService;
  private _screenService: ScreenService;

  constructor(
    recipeService: RecipeService,
    storedService: StoredService,
    screenService: ScreenService,
    toastr: ToastrService) {
    this._toastr = toastr;
    this._recipeService = recipeService;
    this._storedService = storedService;
    this._screenService = screenService;
  }

  ngOnInit() {
    this._screenService.updateScreen.subscribe((screenState: IScreenState) => {
      if (screenState.panels.right === 'recipesList') {
        this.viewRecipeInfo = false;
        this.selectedRecipe = false;
        this.query = screenState.query;
        this.getAllRecipes();
      }
    })
  }

  public searchRecipes(search: string): void {
    this.filteredRecipes = this.recipes.filter((recipe: any) => {
      return recipe.title.toLowerCase().includes(search);
    });
  }

  public getAllRecipes(): void {

    forkJoin([this._recipeService.checkMissingIngredientsAllRecipes(
      JSON.stringify({
        userId: 1,
        queryMethod: 'missingIngredientsAllRecipes'
      })
    ), this._recipeService.getRecipes(JSON.stringify({ userId: 1, queryMethod: this.query }))])
      .subscribe((results: any) => {
        let savedRecipes = [];
        if (this.query === 'allRecipesFromSaved') {

          results[0].map((x: any, index: any) => {

            if (results[1]) {
              results[1].results.map((y: any) => {
                if (y.recipeId === x.recipeId) {
                  savedRecipes.push(x)
                }
              })
            }
          });

        } else {
          savedRecipes = results[1].results;
        }

        const r = savedRecipes.reverse();
        setTimeout(() => this.pageLoading = false, 100);
        this.recipes = r;
        this.filteredRecipes = r;
      });
  }



  public viewRecipe(recipe: any): void {
    this._recipeService
      .getRecipeInstructions(JSON.stringify({
        recipeId: recipe.recipeId,
        queryMethod: 'steps'
      }))
      .subscribe((response: any) => {
        this.selectedRecipe['steps'] = response.results;
        this.viewRecipeInfo = true;
      });
  }

  public end(event: ISwipeEvent, item: any, index: number): void {
    if (event.swipedOff && event.swipeDirection === 'right') {

      if (event.ref) { event.ref.nativeElement.parentElement.removeChild(event.ref.nativeElement); }

      this._recipeService.deleteRecipe(JSON.stringify({
        userId: 1,
        recipeId: item.recipeId,
        queryMethod: 'deleteRecipe'
      })).subscribe((response: any) => {
        this.filteredRecipes = this.filteredRecipes.filter((recipe) => recipe.recipeId !== item.recipeId);
        this._toastr.error(item.title, 'Removed', {
          toastClass: 'toast',
          closeButton: true
        });
      });
    }
  }

  public completeRecipe(item: any): void {
    this._storedService.removeStoredItem(JSON.stringify({
      userId: 1,
      recipeId: item.recipeId
    })).subscribe((response: any) => {
      this._toastr.success(
        'items removed from stored',
        'Recipe completed', {
          toastClass: 'toast',
          closeButton: true
        });
      this.getAllRecipes();
    })
  }
}
