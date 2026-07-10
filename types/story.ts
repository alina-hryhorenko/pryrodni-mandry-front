export interface StoriesOwner {
  _id: string;
  name: string;
  avatarUrl: string;
  articlesAmount: number;
  savedArticles: string[];
  email: string;
}

export interface Story {
  _id: string;
  img: string;
  title: string;
  article: string;
  category: string;
  rate: number;
  ownerId: StoriesOwner;
  date: string;
}

export interface StoryFormData {
  title: string;
  category: string;
  article: string;
}
