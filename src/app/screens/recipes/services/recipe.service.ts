import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private _http: HttpClient;

  constructor(http: HttpClient) {
    this._http = http;
  }


  getRecipes(data: any): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/recipes.php?${data ? `query=${data}` : ''}`)
      .pipe(map((response: any) => response));
  }

  saveRecipe(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/recipes.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  deleteRecipe(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/recipes.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  getRecipeInstructions(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/recipes.php?query=${data}`)
      .pipe(map((response: any) => response));
  }

  checkMissingIngredients(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/recipes.php?query=${data}`)
      .pipe(map((response: any) => this.missingIngredientsMapper(response.results)));
  }
  checkMissingIngredientsAllRecipes(data): Observable<any> {
    return this._http
      .get(`http://chogainz.com/myfoodstore/recipes.php?query=${data}`)
      .pipe(map((response: any) => this.missingIngredientsMapper(response.results)));
  }

  missingIngredientsMapper(response: any): any {
    return response.map((recipe: any) => {
      return {
        ...recipe,
        numberOfMissingItems: parseInt(recipe.numberOfMissingItems, 0),
        foundItems: parseInt(recipe.foundItems, 0),
        totalNumberOfItems: parseInt(recipe.totalNumberOfItems, 0)
      }
    })
  }
}
