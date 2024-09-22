import { Post } from './post.model';

export interface PostsState {
  posts: Post[];
  post: Post;
  filter: string | null;
  status: 'loading' | 'success' | 'error';
  currentPagination: { start: number; limit: number };
}
