import { User } from './User';

export interface ServerResponsePosts {
  countDocuments: number;
  posts: Post[];
}

export interface Post {
  _id: string;
  title: string;
  text: string;
  tags: string[];
  comments: Comment[];
  viewsCount: number;
  author: User;
  createdAt: Date;
  updatedAt: Date;
  imageUrl?: string;
}

export interface Comment {
  _id: string;
  author: User | null;
  text: string;
  postId: string;
  createdAt: string;
  updateddAt: string;
}

export interface AddPost extends Pick<Post, 'title' | 'text' | 'imageUrl'> {
  tags?: string[];
}
