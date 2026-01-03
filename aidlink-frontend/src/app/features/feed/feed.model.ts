export interface UserModel {
  name: string;
  avatarUrl: string;
}

export interface CommentModel {
  id: number;
  user: UserModel;
  text: string;
  likes: number;
}

export interface PostModel {
  type: 'post';
  id: number;
  user: UserModel;
  text: string;
  imageUrl?: string;
  likes: number;
  commentCount: number;
  comments: CommentModel[];
  shares: number;
}

export interface PollOptionModel {
  id: number;
  text: string;
  votes: number;
}

export interface PollModel {
  type: 'poll';
  id: number;
  user: UserModel;
  question: string;
  options: PollOptionModel[];
  totalVotes: number;
}

export interface EventModel {
  type: 'event';
  id: number;
  user: UserModel;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
}

export type FeedItem = PostModel | PollModel | EventModel;
