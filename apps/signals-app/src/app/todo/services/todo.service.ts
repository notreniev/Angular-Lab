import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl } from '@angular/forms';
import { map, of, retry, startWith, Subject, switchMap } from 'rxjs';

import { Pagination } from '../models/pagination.model';
import { Post } from '../models/post.model';
import { PostsState } from '../models/posts.state';

const baseApi = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private readonly http = inject(HttpClient);

  private readonly state = signal<PostsState>({
    posts: [],
    post: {} as Post,
    filter: null,
    error: null,
    status: 'loading',
    pagination: { start: 0, limit: 10 },
  });

  public readonly filterControl = new FormControl();

  // sources
  private readonly filter$ = this.filterControl.valueChanges;
  public readonly currentId$ = new Subject<string>();
  private readonly error$ = new Subject<Error>();
  public readonly pagination$ = new Subject<Pagination>();

  // selectors
  public readonly posts = computed(() => this.state().posts);
  public readonly post = computed(() => this.state().post);
  public readonly filter = computed(() => this.state().filter);
  public readonly error = computed(() => this.state().error);
  public readonly status = computed(() => this.state().status);
  public readonly pagination = computed(() => this.state().pagination);

  public filteredPosts = computed(() => {
    const filter = this.filter();

    return filter
      ? this.posts().filter(post =>
          post.title.toLowerCase().includes(filter.toLowerCase())
        )
      : this.posts();
  });

  private getPostsByPage$ = this.pagination$.pipe(
    startWith(this.state().pagination),
    switchMap(({ start, limit }: Pagination) =>
      this.http.get<Post[]>(`${baseApi}/posts?_start=${start}&_limit=${limit}`)
    ),
    retry({
      delay: err => {
        this.error$.next(err);
        return of([]);
      },
    })
  );

  private getPost$ = this.currentId$.pipe(
    switchMap(id => this.http.get<Post>(`${baseApi}/posts/${id}`)),
    map(post => ({ ...post, body: post.body.replace('\n', '') }))
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

    this.pagination$.pipe(takeUntilDestroyed()).subscribe(pagination =>
      this.state.update(state => ({
        ...state,
        pagination,
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

    this.error$.pipe(takeUntilDestroyed()).subscribe(error =>
      this.state.update(state => ({
        ...state,
        status: 'error',
        error: error.message,
      }))
    );
  }
}
