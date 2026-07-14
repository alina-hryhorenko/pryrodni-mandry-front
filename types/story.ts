export interface Story {
  _id: string;
  title: string;
  article: string;
  img: string;
  savedBySize?: number;
  imageURL?: string;
  rate?: number;
  ownerId: {
    _id: string;
    name: string;
    avatarUrl?: string;
    articlesAmount?: number;
    savedArticles?: string[];
    email?: string;
  };
}

export interface PopularStoriesResponse {
  data: Story[];
}
