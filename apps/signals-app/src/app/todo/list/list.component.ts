import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';

import { TodoService } from './../services/todo.service';
import { IxModule } from '@siemens/ix-angular';
import { Pagination } from '../models/pagination.model';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, IxModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private todoService = inject(TodoService);
  private pagination: Pagination = { start: 0, limit: 10 };
  public $posts = this.todoService.posts;

  onPageSelected(event: Event) {
    const currentPage = (event as CustomEvent).detail;
    this.pagination = { ...this.pagination, start: currentPage };
    this.todoService.setPagination(this.pagination);
  }
}
