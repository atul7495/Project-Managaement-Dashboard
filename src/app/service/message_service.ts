import { EventEmitter, Injectable } from '@angular/core';
import { List } from '../interface/list';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  arr: any[] = [];
  list: List;
  constructor() {
    this.list = new List();
  }
  dataUpdated: EventEmitter<any[]> = new EventEmitter();


  addData(message: string) {
    this.list.id = this.getListId();
    this.list.title = message
    this.arr.push(this.list);
    this.dataUpdated.emit(this.arr.slice());
  }

  getListId() {
    const list = localStorage.getItem('list');
    if (list !== null) {
      this.arr = JSON.parse(list);
      return this.arr.length + 1;
    }
    else
      return 1;
  }
}  