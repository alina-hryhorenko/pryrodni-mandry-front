import { User } from './user';

export interface Story {
  _id: string;
  title: string;
  img?: string;
  imageURL?: string;
  savedBySize?: number;
  rate?: number;
  ownerId: User;
}

export interface PopularStoriesResponse {
  data: Story[];
}
