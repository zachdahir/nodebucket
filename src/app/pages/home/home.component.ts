/**
 * Title: Nodebucket
 * Author: Zachary Dahir
 * Date: 9-26-20
 * Description: home component
 */

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/task.service';
import { HttpClient } from '@angular/common/http';
import { Item } from '../../shared/item.interface';
import { CookieService } from 'ngx-cookie-service';
import { Employee } from './../../shared/employee.interface';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../shared/create-task-dialog/create-task-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  todo: Item[];
  done: Item[];
  employee: Employee;
  firstName: string;
  empId: string;

  constructor(private cookieService: CookieService, private taskService: TaskService, private dialog: MatDialog) {

    //set empId based off session_user which is just empId from login
    this.empId = this.cookieService.get('session_user');

    this.taskService.findAllTasks(this.empId).subscribe( res => {
      console.log('--findAllTasks Response--')
      console.log(res);

      //mapping response data to employee object
      this.employee = res.data;
      console.log('--Employee Object--')
      console.log(this.employee);

    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
      this.firstName = this.employee.firstName;

      console.log('--Complete Function--')
      console.log(this.todo);
      console.log(this.done);
    })
   }

  ngOnInit(): void {
  }

  drop(event: CdkDragDrop<any[]>) {
    //if reordering same container
    if (event.previousContainer === event.container) {
      //move item to new index in same container
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

      console.log('Moved item within list')
    } else {
      //move items between array
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      console.log('Moved item between lists')

      this.updateTaskList(this.empId, this.todo, this.done);
    }
  }

  private updateTaskList(empId: string, todo: Item[], done: Item[]): void {
     this.taskService.updateTask(empId, todo, done).subscribe( res => {
      this.employee = res.data;

    }, err => {
      console.log(err);
    }, () => {
      this.todo = this.employee.todo;
      this.done = this.employee.done;
    })
  }

  //open dialog window for task dialog
  openCreateTaskDialog(){
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      disableClose: true
    })

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.taskService.createTask(this.empId, data.text).subscribe(res => {
          this.employee = res.data;

        }, err => {
         console.log(err);
         }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
        })
      }
    })
  }

  //delete task
  deleteTask(taskId: string) {
    if (taskId) {
      console.log('Item Deleted')

      this.taskService.deleteTask(this.empId, taskId).subscribe(res => {
        this.employee = res.data;

        }, err => {
         console.log(err);
         }, () => {
          this.todo = this.employee.todo;
          this.done = this.employee.done;
      })
    }
  }
}
