import { Component, OnInit } from '@angular/core';
import { CrudService } from '../shared/crud.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services
import { ToastrService } from 'ngx-toastr'; // Alert message using NGX toastr


@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})

export class AddStudentComponent implements OnInit {
  public taskForm: FormGroup;  // Define FormGroup to student's form
 
  constructor(
    public crudApi: CrudService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    public toastr: ToastrService  // Toastr service for alert message
  ) { }

 
  ngOnInit() {
    this.crudApi.GetStudentsList();  // Call GetStudentsList() before main form is being called
    this.taskForm = this.fb.group({
      nameProject: ['', [Validators.required, Validators.minLength(2)]],
      nameTask: [''],
      timeHour: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })              // Call student form when component is ready
  }

  // Accessing form control using getters
  get nameProject() {
    return this.taskForm.get('nameProject');
  }

  get nameTask() {
    return this.taskForm.get('nameTask');
  }  

  get timeHour() {
    return this.taskForm.get('timeHour');
  }

  // Reset student form's values
  ResetForm() {
    this.taskForm.reset();
  }  
 
  submitStudentData() {
    this.crudApi.AddStudent(this.taskForm.value); // Submit student data using CRUD API
    this.toastr.success(this.taskForm.controls['nameProject'].value + ' successfully added!'); // Show success message when data is successfully submited
    this.ResetForm();  // Reset form when clicked on reset button
   };

}
