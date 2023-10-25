import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDragPlaceholder } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
// import { TaskDialogComponent, TaskDialogResult } from './task-dialog/task-dialog.component';
import { TaskDialogResult, TaskDialogComponent } from '../../components/task-dialog/task-dialog.component';
import { FirebaseServiceService, Item } from '../../services/firebase-service.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent {
  title = 'card-board';

  viewMode: 'grid' | 'list' | 'roll' = 'list'
  viewModeA = ['grid', 'list', 'roll'];

  itemCardArrayContainer: any[] = []
  constructor(private dialog: MatDialog, public fbs: FirebaseServiceService) {
  }

  ngOnInit() {
    let itemS = this.fbs.getCollectionValueChange('items');
    itemS.subscribe((x) => {
      this.itemCardArrayContainer[0] = new itemCardArray('items', x);
    })
    // let item2$ = this.fbs.getCollectionValueChange('cities');
    // item2$.subscribe((x) => {
    //   this.itemCardArrayContainer[1] = new itemCardArray('cities', x);
    // })
  }

  addArray(address: string) {
    let x: Observable<any[]>;
    x = this.fbs.getCollectionValueChange(address);
    x.subscribe((x) => {
      this.itemCardArrayContainer.push(new itemCardArray(address, x));
    })
  }
  
  selectCollection(address: string) {
    let itemS = this.fbs.getCollectionValueChange(address);
     itemS.subscribe((x) => {
      this.itemCardArrayContainer[0] = new itemCardArray(address, x);
    })
  }

  a(address: string) {
    this.fbs.addNullDoc(address);
  }
  c(address: string, id: string, content: any) {
    this.fbs.createDoc(address, id, content);
  }
  u(address: string, id: string, content: any) {
    this.fbs.updateDoc(address, id, content);
  }
  r(address: string, id: string) {
    this.fbs.readDoc(address, id);
  }
  d(address: string, id: string) {
    console.log('delete');
    this.fbs.deleteDoc(address, id);
  }

  editTask(list: 'done' | 'todo' | 'inProgress', task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task,
        enableDelete: true,
      },
    });
    dialogRef.afterClosed().subscribe((result: TaskDialogResult | undefined) => {
      // if (!result) {
      //   return;
      // }
      // const dataList = this[list];
      // const taskIndex = dataList.indexOf(task);
      // if (result.delete) {
      //   dataList.splice(taskIndex, 1);
      // } else {
      //   dataList[taskIndex] = task;
      // }
    });
  }
  editTest() {
    console.warn('success')
  }

  drop(event: CdkDragDrop<Task[]> | any): void {
    const item = event.previousContainer.data[event.previousIndex];
    const item2 = event.container.data[event.currentIndex];
    if (event.previousContainer === event.container) {
      console.warn('same')
      let xx = item.id.toString()
      item.id = item2.id.toString()
      item2.id = xx;
      console.log(item)
      console.log(item2)
      let x =
        // this.fbs.deleteDoc(event.previousContainer.id, item.id.toString());
        this.fbs.docSave(event.previousContainer.id, item.id.toString(), item);
      // this.fbs.deleteDoc(event.container.id, item2.id.toString());
      this.fbs.docSave(event.container.id, item2.id.toString(), item2);
      return;
    } else if (item2 == undefined) {
      console.warn('undefinded')
      this.fbs.deleteDoc(event.previousContainer.id, item.id.toString());
      this.fbs.docSave(event.container.id, item.id.toString(), item);
    }
    else {
      console.warn('crossArray')
      console.warn(event.previousContainer.id, item.id.toString());
      console.warn(event.container.id, item2.id.toString(), item2);
      this.fbs.deleteDoc(event.previousContainer.id, item.id.toString());
      this.fbs.docSave(event.container.id, item.id.toString(), item);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      return
    }
  }
  
  newTask(address:string): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '270px',
      data: {
        task: {},
      },
    });
    dialogRef
      .afterClosed()
      .subscribe((result: TaskDialogResult ) => {
        if (!result) {
          return;
        }else{
          console.log(result);
          let x = result;
          let y = {
            id:'x.id',
            name:'x.name',
          }
          this.fbs.addDoc('',y)
        }
        // this.fbs.createDoc('',id,result)
        // this.todo.push(result.task);
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

