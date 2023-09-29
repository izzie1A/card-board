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

  item$: Observable<any[]>;
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  done = ['Get up', 'Brush teeth', 'Take a shower', 'Check e-mail', 'Walk dog'];
  test = ['aaaaaaaaaaa', 'ssssssssssss', 'dddddddddd', 'eeeeeee', 'ggggggggggg'];

  test1: any[] = [];
  test2: any[] = [];
  testArray: any[] = [];
  testArrayString: string[] = ['test1', 'test2'];


  itemCardArrayContainer: any[] = []
  constructor(private dialog: MatDialog, private fbs: FirebaseServiceService) {
    let newItemCardArray = new itemCardArray('doneee', [])
    let newItemCardArray2 = new itemCardArray('todooo', [])
    this.itemCardArrayContainer.push(newItemCardArray);
    this.itemCardArrayContainer.push(newItemCardArray2);
    console.log(this.itemCardArrayContainer);
    console.log('"this.itemCardArrayContainer"');

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

  tDrop(event: CdkDragDrop<string[]> | CdkDragDrop<any[]>) {
    console.log(event);
    
    if (event.previousContainer === event.container) {
      console.log('event transfer');
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('event not transfer');
      transferArrayItem(
        event.previousContainer.data,
        event.container.data, 
        event.previousIndex,
        event.currentIndex,
      );
    }

  }

  drop(event: CdkDragDrop<string[]> | CdkDragDrop<any[]>) {
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

class itemCardArray {
  arrayID: string;
  arrayContent: any[];
  constructor(arrayID: string, arrayContent: any[]) {
    this.arrayID = arrayID;
    this.arrayContent = arrayContent;
    this.addNullItemCard();
  }

  addNullItemCard() {
    this.arrayContent.push(new itemCardItem(this.arrayContent.length, 'nullName' + this.arrayContent.length))
    this.arrayContent.push(new itemCardItem(this.arrayContent.length, 'nullName' + this.arrayContent.length))
    this.arrayContent.push(new itemCardItem(this.arrayContent.length, 'nullName' + this.arrayContent.length))
  }
}

class itemCardItem {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

