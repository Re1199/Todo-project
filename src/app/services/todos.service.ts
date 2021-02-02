import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Injectable({providedIn: 'root'})
export class TodosService {
  public todos: Todo[] = [];
  // public todosCompleted: Todo[] = [];

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos?_limit=10')
      .pipe(tap(todos => this.todos = todos));
  }

  onToggle(id: number): void {
    const i = this.todos.findIndex(t => t.id === id);
    this.todos[i].completed = !this.todos[i].completed;
  }

  removeTodo(id: number): void {
    this.todos = this.todos.filter(t => t.id !== id);
  }

  addTodo(todo: Todo): void {
    this.todos.push(todo);
  }

  filteredTodosDone(): Todo[] {
    return this.todos.filter(todo => {
      return todo.completed;
    });
  }

  filteredTodosUndone(): Todo[] {
    return this.todos.filter(todo => {
      return !todo.completed;
    });
  }

  updateTodo(id: number, newTitle: string): void {
    const i = this.todos.findIndex(t => t.id === id);
    this.todos[i].title = newTitle;
  }
}
