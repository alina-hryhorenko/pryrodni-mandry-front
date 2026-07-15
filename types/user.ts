export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  articlesAmount: number;
  savedArticles: string[];
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

export interface GetUsersParams {
  page: number;
  limit: number;
}
