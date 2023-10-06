import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();
  @Output() editTest = new EventEmitter<Task>();
  @Output() editDelete = new EventEmitter<Task>();

  itemCardMode = 'view';
  array = ['view', 'viewDetail', 'edit', 'keyValue']

  constructor() {

  }

  itemCardModePoke() {
    let anss = this.itemCardMode;
    if (this.itemCardMode == 'view') {
      this.itemCardMode = 'viewDetail';
    } else {
      this.itemCardMode = 'view';
    }
  }

  firebaseSave() {
  }
  firebaseDelete() {
  }
  firebaseEdit() {
  }

  localEdit(key: string, value: any) {
    // console.log(this.task);
  }

}