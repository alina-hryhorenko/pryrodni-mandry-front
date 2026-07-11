export interface Story {
  _id: string;
  title: string;
  img: string;
  savedBySize?: number;
  imageURL?: string;
  rate?: number;
  author: {
    _id: string;
    name: string;
  };
}
