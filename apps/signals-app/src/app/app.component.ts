import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { TodoService } from './todo/services/todo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, IxModule, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'signals-app';

  todoService = inject(TodoService);
  filter = this.todoService.filterControl;
  status = this.todoService.status;
  error = this.todoService.error;
}
