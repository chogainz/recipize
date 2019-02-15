import { Component } from '@angular/core';
import { IScreenState, ScreenService } from 'src/app/shared/services/screen.service';

@Component({
  selector: 'app-recipes-dashboard',
  templateUrl: './recipes-dashboard.component.html',
  styleUrls: ['./recipes-dashboard.component.scss']
})
export class RecipesDashboardComponent {

  private _screenState: IScreenState;
  private _screenService: ScreenService;

  constructor(screenService: ScreenService) {
    this._screenService = screenService;
  }

  ngOnInit() {
    this._screenService.updateScreen.subscribe((state: any) => this._screenState = state);
  }

  public gotToNextScreen(name: string, query: string): void {

    this._screenState.panels = {
      left: 'choices',
      middle: 'recipesDashboard',
      right: name
    }
    this._screenState.panelSideVisible = 'right';
    this._screenState.query = query;
    this._screenService.updateScreen.next(this._screenState)
  }
}
