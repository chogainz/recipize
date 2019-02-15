import { Component, OnInit } from '@angular/core';
import { ScreenService } from '../../shared/services/screen.service';

@Component({
  selector: 'app-choices',
  templateUrl: './choices.component.html',
  styleUrls: ['./choices.component.scss']
})
export class ChoicesComponent implements OnInit {
  private _screenService: ScreenService;

  constructor(screenService: ScreenService) {
    this._screenService = screenService;
  }

  ngOnInit() { }

  public gotToNextScreen(name: string) {
    this._screenService.updateScreen.next({
      panelSideVisible: 'middle',
      panels: {
        left: 'choices',
        middle: name,
        right: ''
      }
    });
  }
}
