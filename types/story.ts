import { User } from "./user";

export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  category: {
    id: string;
    name: string;
  };
  savedBySize?: number;
  imageURL?: string;
  rate?: number;
  ownerId: User;
}

export interface PopularStoriesResponse {
  data: Story[];
}

export interface StoryFormData {
  img: File | null;
  title: string;
  category: string;
  article: string;
}
