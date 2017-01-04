import { Component } from '@angular/core';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TodoDataService]
})
export class AppComponent {

  newTodo: Todo = new Todo();

  constructor(private todoDataService: TodoDataService) {}

  private addTodo() {
    this.todoDataService.addTodo(this.newTodo);
    this.newTodo = new Todo();
  }

  private toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  private removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo.id);
  }

  private listTodos() {
    return this.todoDataService.getAllTodos();
  }
}
