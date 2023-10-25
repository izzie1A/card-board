import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card-detail',
  templateUrl: './item-card-detail.component.html',
  styleUrls: ['./item-card-detail.component.css']
})
export class ItemCardDetailComponent {
  @Input() task: Task | null = null;
  @Output() edit = new EventEmitter<Task>();


  todo: Task[] = [
    {
      title: 'Buy milk',
      description: 'Go to the store and buy milk'
    },
    {
      title: 'Create a Kanban app',
      description: 'Using Firebase and Angular create a Kanban app!'
    }
  ];

}
export interface Task {
  id?: string;
  title: string;
  description: string;
}