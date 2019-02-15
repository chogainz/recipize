import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-slide-panel',
  templateUrl: './slide-panel.component.html',
  styleUrls: ['./slide-panel.component.scss'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('middle', style({ transform: 'translateX(-25%)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      state('last', style({ transform: 'translateX(-75%)' })),
      transition('*  <=> *', animate('300ms ease-out'))
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlidePanelComponent implements OnInit {
  @Input() public activePane: any = 'left';
 
  constructor() {

  }

  ngOnInit() {
  }

  public animationDone(event: any) {
    // if (this.screenState) {
    //   this.screenState.history.pop();
    // }
  }
}
