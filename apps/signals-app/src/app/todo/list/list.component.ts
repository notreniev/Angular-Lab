import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TodoService } from './../services/todo.service';
import { IxModule } from '@siemens/ix-angular';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, IxModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private todoService = inject(TodoService);

  public $posts = this.todoService.posts;
}
