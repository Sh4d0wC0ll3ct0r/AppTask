import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Tasks } from '../shared/student';  // Student data type interface class
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';  // Firebase modules for Database, Data list and Single object

@Injectable({
  providedIn: 'root'
})

export class CrudService {
  tasksRef: Tasks[];    // Reference to Student data list, its an Observable
  TaskRef: AngularFireObject<any>;   // Reference to Student object, its an Observable too
  
  // Inject AngularFireDatabase Dependency in Constructor
  constructor(private db: AngularFireDatabase,public _http: HttpClient) {
    this.tasksRef = [];
  }

  // Create Student
  AddStudent(task: Tasks) {
    console.log(task.nameProject,task.nameTask,task.timeHour);
    this.tasksRef.push({
      nameProject: task.nameProject,
      nameTask: task.nameTask,
      timeHour: task.timeHour
    });
    let tasksRef = [];
    if(localStorage.getItem('tasks') === null) {
      tasksRef = [];
      tasksRef.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasksRef));
    } else {
      tasksRef = JSON.parse(localStorage.getItem('tasks'));
      tasksRef.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasksRef));
    }
  }

  // Fetch Single Student Object
  GetStudent(id: string) {
    this.TaskRef = this.db.object('students-list/' + id);
    return this.TaskRef;
  }

  // Fetch Students List
  GetStudentsList() {

  //  this.tasksRef = JSON.parse(localStorage.getItem('tasks'));
    return this._http.get('https://jsonplaceholder.typicode.com/users').pipe(
      map(resultados => {

        localStorage.setItem('user', JSON.stringify(resultados));

        return resultados;
      }));
    //return this.tasksRef;
  }  

  // Update Student Object
  UpdateStudent(task: Tasks) {
    this.TaskRef.update({
      nameProject: task.nameProject,
      nameTask: task.nameTask,
      timeHour: task.timeHour
    })
  }  

  // Delete Student Object
  DeleteStudent(id: string) { 
    this.TaskRef = this.db.object('students-list/'+id);
    this.TaskRef.remove();
  }
 /* addToLocalStorage() {
    if (typeof(Storage) !== "undefined") {
      localStorage.setItem("todoList", JSON.stringify(todoList));
    }
    else {
      alert("browser doesn't support local storage!");
    }
  }*/
}
