import { Component, OnInit, DoCheck, AfterContentChecked, } from '@angular/core';
import {Todo, TodosService} from '../services/todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit, DoCheck {
  changing = false;
  title = '';
  updId = -1;

  constructor(private todosService: TodosService) {
  }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    if (this.todosService.updatingId !== -1) {
      this.changing = true;
      this.title = this.todosService.getTitle();
      this.updId = this.todosService.updatingId;
      this.todosService.setUpdId();
    }
  }

  addTodo(): void {
    if (this.title !== '') {
      const todo: Todo = {
        title: this.title,
        id: Date.now(),
        completed: false
      };

      this.todosService.addTodo(todo);
      this.title = '';
    }
  }

  updateTodo(): void {
    this.todosService.changeTitle(this.updId, this.title.trim());
    this.title = '';
    this.changing = false;
  }
}
