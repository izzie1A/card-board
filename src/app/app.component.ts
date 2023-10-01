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
  constructor(private dialog: MatDialog, public fbs: FirebaseServiceService) {
    this.item$ = this.fbs.getCollectionValueChange('items');
    this.item$.subscribe((x) => {
      this.itemCardArrayContainer[0]=new itemCardArray('items', x);
    })
  }
  a(address: string){
    this.fbs.addNullDoc(address);
  }
  c(address: string, id: string, content: any){
    this.fbs.createDoc(address,id,content);
  }
  u(address: string, id: string, content: any){
    this.fbs.updateDoc(address,id,content);
  }
  r(address: string, id: string){
    this.fbs.readDoc(address,id);
  }
  d(address: string, id: string){
    this.fbs.deleteDoc(address,id);
  }

  drop(address:string,event: CdkDragDrop<string[]> | CdkDragDrop<any[]>) {
    console.log(event)
    const item = event.previousContainer.data[event.previousIndex];
    console.log(item)
    const item2 = event.container.data[event.currentIndex];
    console.log(item2)

    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      // this.fbs.deleteDoc(address, item.id);
      // this.fbs.createDoc(address, item.id ,item);
    } else {
      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
    }
  }



  newTask(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult | undefined) => {
        if (!result) {
          return;
        }
        this.itemCardArrayContainer[0].arrayContent.push(result.task);
      });
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
    // this.arrayContent.push(new itemCardItem(this.arrayContent.length, 'nullName' + this.arrayContent.length))
    // this.arrayContent.push(new itemCardItem(this.arrayContent.length, 'nullName' + this.arrayContent.length))
    // this.arrayContent.push(new itemCardItem(this.arrayContent.length, 'nullName' + this.arrayContent.length))
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

