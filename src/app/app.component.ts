import { Component } from '@angular/core';
import { Task } from './components/task';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
// import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { TaskDialogResult, TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { FirebaseServiceService } from './services/firebase-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'card-board';
  // todo: Task[] = [
  //   {
  //     title: 'Buy milk',
  //     description: 'Go to the store and buy milk'
  //   },
  //   {
  //     title: 'Create a Kanban app',
  //     description: 'Using Firebase and Angular create a Kanban app!'
  //   }
  // ];
  // inProgress: Task[] = [];
  // done: Task[] = [];

  item$: Observable<any[]>;
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  test = ['aaaaaaaaaaa', 'ssssssssssss', 'dddddddddd', 'eeeeeee', 'ggggggggggg'];
  // test1:any[] = [, 'ssssssssssss', 'dddddddddd', 'eeeeeee', 'ggggggggggg'];
  test1:any[] = [];
  test2:any[] = [];
  testArray:any[]=[];
  // todo: Observable<Task[]>;
  // done: Observable<Task[]>;
  // inProgress: Observable<Task[]>;


  constructor(private dialog: MatDialog, private fbs: FirebaseServiceService) {
    // this.todo = this.fbs.getCollectionValueChange('todo');
    // this.done = th is.fbs.getCollectionValueChange('done');
    // this.inProgress = this.fbs.getCollectionValueChange('inProgress');
    
    let tx = {name:'aaaaaaaaaaa'}
    this.test1.push(tx);
    this.test2.push(tx);

    this.testArray.push(this.test1);
    this.testArray.push(this.test2);

    this.item$ = this.fbs.getCollectionValueChange('items');
  }

  // editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
  //   const dialogRef = this.dialog.open(TaskDialogComponent, {
  //     width: '270px',
  //     data: {
  //       task,
  //       enableDelete: true,
  //     },
  //   });
  //   dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
  //     if (!result) {
  //       return;
  //     }
  //     const dataList = this[list];
  //     const taskIndex = dataList.indexOf(task);
  //     if (result.delete) {
  //       dataList.splice(taskIndex, 1);
  //     } else {
  //       dataList[taskIndex] = task;
  //     }
  //   });
  // }

  drop(event: CdkDragDrop<string[]>|CdkDragDrop<any[]>) {
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

    // drop(event: CdkDragDrop<string[]>) {
    //   moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
    // }

    // drop(event: CdkDragDrop<Task[]>): void {
    //   if (event.previousContainer === event.container) {
    //     return;
    //   }
    //   if (!event.container.data || !event.previousContainer.data) {
    //     return;
    //   }
    //   transferArrayItem(
    //     event.previousContainer.data,
    //     event.container.data,
    //     event.previousIndex,
    //     event.currentIndex
    //   );
    // }

    // newTask(): void {
    //   const dialogRef = this.dialog.open(TaskDialogComponent, {
    //     width: '270px',
    //     data: {
    //       task: {},
    //     },
    //   });
    //   dialogRef
    //     .afterClosed()
    //     .subscribe((result: TaskDialogResult | undefined) => {
    //       if (!result) {
    //         return;
    //       }
    //       this.todo.push(result.task);
    //     });
    // }


  }
}
