import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Post } from '../models/post.model';
import { toSignal } from '@angular/core/rxjs-interop';

const baseApi = 'https://jsonplaceholder.typicode.com';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private http = inject(HttpClient);
  private selectedPostId = signal<string>('');

  private getPosts = this.http.get<Post[]>(`${baseApi}/posts`);

  public searchPost(search: string) {
    this.selectedPostId.set(search);
  }

  private postsResults = toSignal(this.getPosts);

  public posts = computed(() => {
    const search = this.selectedPostId();
    const posts = this.postsResults();

    if (search) {
      return posts?.filter((post) => post.title.includes(search));
    } else {
      return posts;
    }
  });
}
