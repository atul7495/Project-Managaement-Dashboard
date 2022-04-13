import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { List } from '../interface/list';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  CardForm: FormGroup = new FormGroup({});
  cardItem: any[] = [];
  arr: any[] = [];
  count: number | undefined;
  constructor(public dialogRef: MatDialogRef<CardComponent>,
    @Inject(MAT_DIALOG_DATA) public data: List) { }

  ngOnInit(): void {
    this.getCardId();
    var id = this.count;
    this.CardForm = new FormGroup({
      CardId: new FormControl(id),
      Title: new FormControl("", Validators.required),
      Desc: new FormControl("", Validators.required),
      CreationTime: new FormControl("", Validators.required),
    })
  }


  OnSubmit() {
    if (this.CardForm.valid)
      this.dialogRef.close(this.CardForm.value);

  }
  onNoClick() {
    this.dialogRef.close(this.CardForm.value);
  }

  getCardId() {
    const list = localStorage.getItem('list');
    if (list !== null) {
      this.arr = JSON.parse(list);
      this.arr.forEach((ele) => {
        if (ele.id == this.data.id) {
          this.count = Object.keys(ele.Card).length + 1
          return this.count;
        }
        return 1;
      })
    }
  }

}
