import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/message_service';


@Component({
  selector: 'app-project-management',
  templateUrl: './project-management.component.html',
  styleUrls: ['./project-management.component.css']
})
export class ProjectManagementComponent implements OnInit {


  ProjectForm: FormGroup = new FormGroup({});
  isAddMode: boolean = false;
  title?: any;
  isLoaded: boolean = false;
  message: any;

  
  constructor(private router: Router, private data: DataService) {

  }


  ngOnInit(): void {
    this.ProjectForm = new FormGroup({
      ptitle: new FormControl('', [Validators.required])
    })
    this.isAddMode = true;

  }


  OnSubmit() {
    this.isLoaded = true;
    this.title = this.ProjectForm.value.ptitle;
    if (this.title != '' || null)
      this.data.addData(this.title);
    this.router.navigate(['home']);
    this.isAddMode = true;
  }

  OnCancel() {
    this.isAddMode = false;
    this.router.navigate(['']);

  }
}
