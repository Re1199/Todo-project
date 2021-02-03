import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {TodosService} from '../services/todos.service';
import {delay} from 'rxjs/operators';


@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  loading = true;

  constructor(public todosService: TodosService) { }

  ngOnInit(): void {
    this.todosService.getTodos()
      .pipe(delay(200))
      .subscribe(() => {
        this.loading = false;
      }, error => console.error(error))
    ;
  }

  onChangeCheckbox(id: number): void {
    this.todosService.onToggle(id);
  }

  removeTodo(id: number): void {
    this.todosService.removeTodo(id);
  }

  updateTodo(id: number): void {
    this.todosService.updateTodo(id);
  }
}
