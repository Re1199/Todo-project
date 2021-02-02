import { Component, OnInit } from '@angular/core';
import {Todo, TodosService} from '../services/todos.service';

@Component({
  selector: 'app-todo-form',
  templateUrl: './todo-form.component.html',
  styleUrls: ['./todo-form.component.scss']
})
export class TodoFormComponent implements OnInit {

  title = '';

  constructor(private todosService: TodosService) { }

  ngOnInit(): void {
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

  updateTodo(currentTitle: string): void {
    this.title = '';
  }
}
