import { User } from "./user";

export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  savedBySize?: number;
  imageURL?: string;
  rate?: number;
  ownerId: User;
}

export interface PopularStoriesResponse {
  data: Story[];
}
