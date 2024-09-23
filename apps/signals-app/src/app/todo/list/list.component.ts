import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
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
  private pagination = signal<Pagination>({ start: 0, limit: 10 });

  public posts = this.todoService.filteredPosts;

  onPageSelected(event: Event) {
    const currentPage = (event as CustomEvent).detail;
    const page = { ...this.pagination(), start: currentPage };
    this.pagination.update(currentPagination => ({
      ...currentPagination,
      page,
    }));
    this.todoService.pagination$.next(this.pagination());
  }

  onPageSizeChange(event: Event) {
    const pageSize = (event as CustomEvent).detail;
    const page = { ...this.pagination(), limit: pageSize };
    this.pagination.update(currentPagination => ({
      ...currentPagination,
      page,
    }));
    this.todoService.pagination$.next(this.pagination());
  }
}
