import { Post } from './post.model';

export interface PostsState {
  posts: Post[];
  post: Post;
  filter: string | null;
  status: 'loading' | 'success' | 'error';
  pagination: { start: number; limit: number };
}
