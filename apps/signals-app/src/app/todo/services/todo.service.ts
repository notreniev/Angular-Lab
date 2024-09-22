import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { Pagination } from '../models/pagination.model';
import { Post } from '../models/post.model';
import { BehaviorSubject, switchMap } from 'rxjs';

const baseApi = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private selectedPostId = signal<string>('');
  private selectedPagination = new BehaviorSubject<Pagination>({
    start: 0,
    limit: 10,
  } as Pagination);

  private getPosts = this.selectedPagination.pipe(
    switchMap(queryParams =>
      this.http.get<Post[]>(
        `${baseApi}/posts?_start=${queryParams.start}&_limit=${queryParams.limit}`
      )
    )
  );

  public searchPost(search: string) {
    this.selectedPostId.set(search);
  }

  public setPagination(pages: Pagination) {
    this.selectedPagination.next(pages);
  }

  private postsResults = toSignal(this.getPosts);

  public posts = computed(() => {
    const search = this.selectedPostId();
    const posts = this.postsResults();

    if (search) {
      return posts?.filter(post =>
        post.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
    } else {
      return posts;
    }
  });

  // selectors
  public readonly state = {
    posts: this.posts(),
  };
}
