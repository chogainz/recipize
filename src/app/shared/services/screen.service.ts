import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

export interface IScreenState {
  panelSideVisible: string;
  query?: string;
  panels: {
    left: string;
    middle: string;
    right: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class ScreenService {
  updateScreen: BehaviorSubject<IScreenState> = new BehaviorSubject({
    panelSideVisible: 'left',
    panels: {
      left: 'choices',
      middle: '',
      right: ''
    }

  });
  constructor() { }
}
