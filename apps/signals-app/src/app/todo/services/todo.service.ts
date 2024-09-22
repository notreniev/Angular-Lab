import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { Pagination } from '../models/pagination.model';
import { Post } from '../models/post.model';
import { startWith, Subject, switchMap } from 'rxjs';
import { PostsState } from '../models/posts.state';
import { FormControl } from '@angular/forms';

const baseApi = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);

  private state = signal<PostsState>({
    posts: [],
    post: {} as Post,
    filter: null,
    status: 'loading',
    currentPagination: { start: 0, limit: 10 },
  });

  public filterControl = new FormControl();

  // selectors
  posts = computed(() => this.state().posts);
  post = computed(() => this.state().post);
  filter = computed(() => this.state().filter);
  status = computed(() => this.state().status);
  currentPagination = computed(() => this.state().currentPagination);

  public filteredPosts = computed(() => {
    const filter = this.filter();

    return filter
      ? this.posts().filter(post =>
          post.title.toLowerCase().includes(filter.toLowerCase())
        )
      : this.posts();
  });

  // sources
  filter$ = this.filterControl.valueChanges;
  currentId$ = new Subject<string>();
  currentPagination$ = new Subject<Pagination>();

  private getPostsByPage$ = this.currentPagination$.pipe(
    startWith(this.state().currentPagination),
    switchMap(({ start, limit }: Pagination) =>
      this.http.get<Post[]>(`${baseApi}/posts?_start=${start}&_limit=${limit}`)
    )
  );

  private getPost$ = this.currentId$.pipe(
    switchMap(id => this.http.get<Post>(`${baseApi}/posts/${id}`))
  );

  constructor() {
    // reducers
    this.getPostsByPage$.pipe(takeUntilDestroyed()).subscribe(posts =>
      this.state.update(state => ({
        ...state,
        posts,
        status: 'success',
      }))
    );

    this.getPost$.pipe(takeUntilDestroyed()).subscribe(post =>
      this.state.update(state => ({
        ...state,
        post,
        status: 'success',
      }))
    );

    this.currentPagination$.pipe(takeUntilDestroyed()).subscribe(currentPage =>
      this.state.update(state => ({
        ...state,
        currentPage,
        status: 'loading',
        posts: [],
      }))
    );

    this.filter$.pipe(takeUntilDestroyed()).subscribe(filter =>
      this.state.update(state => ({
        ...state,
        filter: filter === '' ? null : filter,
      }))
    );
  }
}
