import { Component, OnInit } from '@angular/core';
import { ScreenService, IScreenState } from './shared/services/screen.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public notification: any = { open: false, message: '' };
  public screenState: IScreenState;
  private _screenService: ScreenService;

  constructor(screenService: ScreenService) {
    this._screenService = screenService;
  }

  public ngOnInit(): void {
    this._screenService.updateScreen.subscribe((state: IScreenState) => this.screenState = state);
  }

  public gotToNextScreen(name:string, sidenav: MatSidenav): void {

    this.screenState.panels = {
      left: 'choices',
      middle: name,
      right: ''
    };

    this._screenService.updateScreen.next(this.screenState);
    sidenav.toggle()
  }

  public goBack(): void {
    if (this.screenState.panelSideVisible === 'middle') { this.screenState.panelSideVisible = 'left'; }
    if (this.screenState.panelSideVisible === 'right') { this.screenState.panelSideVisible = 'middle'; }

    this._screenService.updateScreen.next(this.screenState);
  }
}
