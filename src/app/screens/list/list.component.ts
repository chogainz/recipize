import { Component, OnInit } from '@angular/core';
import { ListService } from './services/list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public list: Array<any> = [];
  public pageLoading = true;
  private _listService: ListService;
  private _toastr: ToastrService;

  constructor(
    listService: ListService,toastr: ToastrService) {
    this._listService = listService;
    this._toastr = toastr;
  }

  ngOnInit() {
    this._listService
      .getUserList(JSON.stringify({
        userId: 1
      }))
      .subscribe((response: any) => {
        setTimeout(() => this.pageLoading = false, 100);
        this.list = response ? response.results : [];
      });
  }
  public removeListItem(event: any, item: any): void {
    if (event.swipeDirection === 'right') {
      if (event.ref) { event.ref.nativeElement.parentElement.removeChild(event.ref.nativeElement); }
      this._listService.removeListItem(JSON.stringify({ userId: 1, itemId: item.itemId }))
        .subscribe(() => {
          this._toastr.error(item.title, 'Removed', {
            toastClass: 'toast',
            closeButton: true
          });
          this.list = this.list.filter((removedItem: any) => item.itemId !== removedItem.itemId);
        });
    }
  }

  public updateQuantity(item: any, action: string) {
    action === 'add' ? item.quantity++ : item.quantity--;
    if (item.quantity === 0) {
      this.removeListItem({ swipeDirection: 'right' }, item);
    } else {
      this._listService.updateListItemQuantity(JSON.stringify({
        userId: 1,
        itemId: item.itemId,
        quantity: item.quantity
      })).subscribe();
    }
  }
}
