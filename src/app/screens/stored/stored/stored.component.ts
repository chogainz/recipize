import { Component, OnInit, Input } from '@angular/core';
import { StoredService } from '../services/stored.service';
import { ToastrService } from 'ngx-toastr';
import { IScreenState, ScreenService } from 'src/app/shared/services/screen.service';

@Component({
  selector: 'app-stored',
  templateUrl: './stored.component.html',
  styleUrls: ['./stored.component.scss']
})
export class StoredComponent implements OnInit {
  public stored: Array<any> = [];
  public pageLoading = true;

  private _storedService: StoredService;
  private _screenService: ScreenService;
  private _toastr: ToastrService;

  constructor(
    storedService: StoredService,
    toastr: ToastrService,
    screenService: ScreenService) {
    this._storedService = storedService;
    this._screenService = screenService;
    this._toastr = toastr;
  }

  ngOnInit() {
    this._screenService.updateScreen
      .subscribe((screenState: IScreenState) => {
        if (screenState.panels.right === 'stored') {
          this.getStoredItems(screenState.query);
        }
      });
  }

  public getStoredItems(query: string) {
    this._storedService
      .getUserStoredByCateogory(JSON.stringify({
        userId: 1,
        category: query
      }))
      .subscribe((response: any) => {
        setTimeout(() => this.pageLoading = false, 100);
        this.stored = response ? response.results : [];
      });
  }

  public removeStoredItem(event: any, item: any): void {
    if (event.swipeDirection === 'right') {
      if (event.ref) { event.ref.nativeElement.parentElement.removeChild(event.ref.nativeElement); }
      this._storedService.removeStoredItem(JSON.stringify({ userId: 1, itemId: item.itemId }))
        .subscribe(() => {
          this._toastr.error(item.title, 'Removed', {
            toastClass: 'toast',
            closeButton: true
          });
          this.stored = this.stored.filter((removedItem: any) => item.itemId !== removedItem.itemId);
        });
    }
  }

  public updateQuantity(item: any, action: string) {
    action === 'add' ? item.quantity++ : item.quantity--;
    if (item.quantity === 0) {
      this.removeStoredItem({ swipeDirection: 'right' }, item);
    } else {
      this._storedService.updateStoredItemQuantity(JSON.stringify({
        userId: 1,
        itemId: item.itemId,
        quantity: item.quantity
      })).subscribe();
    }
  }
}
