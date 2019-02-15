import { Component, OnInit } from '@angular/core';
import { IScreenState, ScreenService } from 'src/app/shared/services/screen.service';

@Component({
  selector: 'app-stored-dashboard',
  templateUrl: './stored-dashboard.component.html',
  styleUrls: ['./stored-dashboard.component.scss']
})
export class StoredDashboardComponent implements OnInit {


  public _screenState: IScreenState;
  private _screenService: ScreenService;

  constructor(screenService: ScreenService) {
    this._screenService = screenService;
  }

  public ngOnInit(): void {
    this._screenService.updateScreen
      .subscribe((screenState: IScreenState) => this._screenState = screenState);
  }

  public gotToNextScreen(query: string): void {
    this._screenState.query = query;
    this._screenState.panels.right = 'stored';
    this._screenState.panelSideVisible = 'right';
    this._screenService.updateScreen.next(this._screenState)
  }
}
