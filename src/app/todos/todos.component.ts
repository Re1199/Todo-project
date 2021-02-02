import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TodosService} from '../services/todos.service';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  private loading = true;

  constructor(public todosService: TodosService) { }

  // @Output() toggle = new EventEmitter<number>();

  ngOnInit(): void {
    this.todosService.fetchTodos()
      .pipe(delay(500))
      .subscribe(() => {
        this.loading = false;
      })
    ;
  }

  onChange(id: number): void {
    this.todosService.onToggle(id);
  }

  removeTodo(id: number): void {
    this.todosService.removeTodo(id);
  }

  updateTodo(id: number): void {
    const newTitle = 'fnv';
    this.todosService.updateTodo(id, newTitle);
  }
}