import {
  Directive,
  ElementRef,
  HostListener,
  Output,
  EventEmitter,
  Input
}

  from '@angular/core';


export interface ISwipeOptions {
  swipeEnabled: boolean;
  useCustomStyle: boolean;
}


export interface ISwipeEvent {
  swipeDirection: string;
  ref?: ElementRef;
  showContent?: boolean;
  swipedOff?: boolean;
}


@Directive({
  selector: '[appSwipeOff]'
}


) export class SwipeOffDirective {
  private _element: ElementRef;
  private _startCoord: any;
  private _swipeCoord: any;
  private _startRect: any;
  private _startProperties = {
    start: 0,
    firstQuarter: 0,
    middle: 0,
    thirdQuarter: 0,
    lastQuarter: 0,
  };

  constructor(ref: ElementRef) {
    this._element = ref;
  }

  @Input() options: ISwipeOptions = {
    swipeEnabled: true,
    useCustomStyle: false,
  };

  @Output() start: EventEmitter<ISwipeEvent> = new EventEmitter();
  @Output() move: EventEmitter<ISwipeEvent> = new EventEmitter();
  @Output() end: EventEmitter<ISwipeEvent> = new EventEmitter();

  @HostListener('touchstart', ['$event']) onstart(event: any) { this.swipe(event, 'start'); }
  @HostListener('touchmove', ['$event']) onmove(event: any) { this.swipe(event, 'move'); }
  @HostListener('touchend', ['$event']) onend(event: any) { this.swipe(event, 'end'); }

  public swipe(e: TouchEvent, when: string): void {

    const rect = this._element.nativeElement.getBoundingClientRect();
    const coord = { x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY };

    if (this.options.swipeEnabled) {
      switch (when) {
        case 'start':
          this._startCoord = coord;
          this._startRect = this._element.nativeElement.getBoundingClientRect();

          this._startProperties = {
            start: 0,
            firstQuarter: e.view.screen.availWidth / 4,
            middle: e.view.screen.availWidth / 2,
            thirdQuarter: (e.view.screen.availWidth / 4) * 3,
            lastQuarter: e.view.screen.availWidth,
          }

          break;

        case 'move': {

          this._swipeCoord = coord;
          const translateNum = this._swipeCoord.x - this._startCoord.x;
          this._element.nativeElement.style.webkitTransform = 'translate(' + (translateNum) + 'px) rotate( ' + 0 + 'deg)';
          this._element.nativeElement.style.opacity = '1';
          this._element.nativeElement.style.background = 'white';

          if (this.options.useCustomStyle) {
            this._element.nativeElement.style.border = 'none';
            this._element.nativeElement.style.transition = 'background 3.s';
            this._element.nativeElement.style.transition = 'opacity .3s';

            this.move.emit({ swipeDirection: 'none', showContent: true, swipedOff: false });

            if ((rect.x + this._startRect.width) < (this._startProperties.middle)) {
              this.move.emit({ swipeDirection: 'left', showContent: false, swipedOff: true });
              this._element.nativeElement.style.background = '#ef2658';
              this._element.nativeElement.style.opacity = '.85';
            }

            if (rect.x > this._startProperties.middle) {
              this.move.emit({ swipeDirection: 'right', showContent: false, swipedOff: true });
              this._element.nativeElement.style.background = '#029b29';
              this._element.nativeElement.style.opacity = '.85';
            }
          }
        }
          break;

        case 'end':

          this.end.emit({ swipeDirection: 'none', ref: this._element, swipedOff: false });

          if ((rect.x + this._startRect.width) < (this._startProperties.middle)) {
            this.end.emit({ swipeDirection: 'left', ref: this._element, swipedOff: true });
          }
          if (rect.x > this._startProperties.middle) {
            this.end.emit({ swipeDirection: 'right', ref: this._element, swipedOff: true });
          }
          this._element.nativeElement.style.webkitTransform = 'translate(' + (0) + 'px) rotate( ' + 0 + 'deg)';
          break;
      }
    }
  }
}
