import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IxModule } from '@siemens/ix-angular';

import { Pagination } from '../models/pagination.model';
import { TodoService } from './../services/todo.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, IxModule, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  private todoService = inject(TodoService);
  private pagination: Pagination = { start: 0, limit: 10 };

  public posts = this.todoService.filteredPosts;

  onPageSelected(event: Event) {
    const currentPage = (event as CustomEvent).detail;
    const pagination = { ...this.pagination, start: currentPage };
    this.todoService.pagination$.next(pagination);
  }

  onPageSizeChange(event: Event) {
    const pageSize = (event as CustomEvent).detail;
    const pagination = { ...this.pagination, limit: pageSize };
    this.todoService.pagination$.next(pagination);
  }
}
