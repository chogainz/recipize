import { Component, OnInit } from '@angular/core';
import { ScreenService, IScreenState } from '../shared/services/screen.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public screenState: IScreenState = {
    panelSideVisible: 'left',
    panels: {
      left: 'choices',
      middle: '',
      right: ''
    }
  };
  public screenName: string = '';

  private _screenService: ScreenService;

  constructor(screenService: ScreenService) {
    this._screenService = screenService;
  }

  ngOnInit() {
    this._screenService.updateScreen
      .subscribe((state: any) => this.screenState = state);
  }
}
