
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { CardComponent } from '../card/card.component';
import { List } from '../interface/list';
import { DataService } from '../service/message_service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  key: any;
  value?: string;
  dialogSUb: Subscription = new Subscription;
  id: any;
  arr: any[] = [];
  cardItems: any[] = [];
  list: List;
  count!: number;

  constructor(private dialog: MatDialog, private data: DataService) {
    this.list = new List();
  }

  ngOnDestroy(): void {

    this.dialogSUb.unsubscribe();
  }

  ngOnInit(): void {

    //saving the list data in local storage
    this.data.dataUpdated.subscribe((data) => {
      this.arr = data;
      localStorage.setItem('list', JSON.stringify(this.arr));
    });

    //storing in array of all the data
    var key = localStorage.getItem('list');
    if (key != null)
      this.arr = JSON.parse(key);
  }

  //open dialog box for entering data
  openDialog(x: number) {
    const dialoref = this.dialog.open(CardComponent, { width: '250px', data: { id: x } });

    this.dialogSUb = dialoref.afterClosed().subscribe((data) => {

      if (data.Title != '' || data.Desc != '' || data.CreationTime != '') {
        const val = localStorage.getItem("list");
        if (val != null) {
          this.cardItems = JSON.parse(val);
          this.cardItems.forEach((ele) => {
            if (ele.id == x) {
              this.list.Card = ele.Card;
              this.list.Card.push(data);
              this.list.Card.sort((a,b)=>
                 a.CreationTime.localeCompare(b.CreationTime) || b.CreationTime - a.CreationTime
              );
              ele.Card = this.list.Card;
            }
          })
          this.list.Card = [];
        }
        localStorage.setItem("list", JSON.stringify(this.cardItems));
        this.ngOnInit();
      }
    })

  }

  //function for removing whole list
  RemoveList(listId: number) {
    const val = localStorage.getItem("list");
    if (val != null) {
      this.arr = JSON.parse(val);
      this.arr.splice(this.arr.findIndex((x) => x.id == listId), 1);
    }
    localStorage.setItem('list', JSON.stringify(this.arr));
    this.ngOnInit();
  }

  //function for removing card from the list
  RemoveCard(listId: any, CardId: number) {
    const val = localStorage.getItem("list");
    if (val != null) {
      this.cardItems = JSON.parse(val);
      this.cardItems.forEach((ele) => {
        if (ele.id == listId) {
          this.arr = ele.Card;
          this.arr.splice(this.arr.findIndex((x) => x.CardId == CardId), 1)
        }
      })
      localStorage.setItem("list", JSON.stringify(this.cardItems));
      this.ngOnInit();
    }
  }

  //drad and drop api functionality
  drop(event: CdkDragDrop<List[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(

        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
    this.getCardId(event.container.id);
    this.RemoveCard(event.previousContainer.id, event.item.data.CardId);
    this.UpdateData(this.count, event.item.data, event.container.id);
  }

  //get the cardId
  getCardId(id: any) {
    const list = localStorage.getItem('list');
    if (list !== null) {
      this.arr = JSON.parse(list);
      this.arr.forEach((ele) => {
        if (ele.id == id) {
          this.count = Object.keys(ele.Card).length + 1
          return this.count;
        }
        return 1;
      })
    }
  }

  //udate data function after draging
  UpdateData(id: number, data: any, ListId: any) {
    data.CardId = id;
    const val = localStorage.getItem("list");
    if (val != null) {
      this.cardItems = JSON.parse(val);
      this.cardItems.forEach((ele) => {
        if (ele.id == ListId) {
          this.list.Card = ele.Card;
          this.list.Card.push(data);
          ele.Card = this.list.Card;
        }
      })
      this.list.Card = [];
    }
    localStorage.setItem("list", JSON.stringify(this.cardItems));
    this.ngOnInit();
  }
}


