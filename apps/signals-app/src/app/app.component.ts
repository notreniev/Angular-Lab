import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';
import { TodoService } from './todo/services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, IxModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'signals-app';

  todoService = inject(TodoService);

  onClick(value: string) {
    this.todoService.searchPost(value);
  }
}
