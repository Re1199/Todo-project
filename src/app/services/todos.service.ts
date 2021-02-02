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
  todos: Todo[] = [];
  updatingId = -1;

  constructor(private http: HttpClient) {}

  fetchTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
      .pipe(tap(todos => {
        this.todos = this.getRandom(todos, 10);
        console.log(this.todos);
      }));
  }

  private getRandom(arr: Todo[], n: number): Array<Todo> {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len;
    }
    return result;
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
    return this.todos
      .filter(todo => {
        return todo.completed;
      }
    );
  }

  filteredTodosUndone(): Todo[] {
    return this.todos
      .filter(todo => {
        return !todo.completed;
      })
      .sort((a, b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0));
  }

  updateTodo(id: number): void {
    this.updatingId = this.todos.findIndex(t => t.id === id);
  }

  setUpdId(): void {
    this.updatingId = -1;
  }

  getTitle(): string {
    if (this.updatingId !== -1) {
      return this.todos[this.updatingId].title;
    } else {
      return '';
    }
  }

  changeTitle(i: number, newTitle: string): void {
    this.todos[i].title = newTitle;
  }
}
