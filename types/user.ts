<<<<<<< HEAD
=======
// Тимчасово створено для тесту Join секції
// export interface User {
//   email: string;
//   username: string;
//   avatar: string;
// }

>>>>>>> develop
export interface User {
  _id: string;
  name: string;
  email: string;
  avatarUrl: string;
  articlesAmount: number;
  savedArticles: string[];
<<<<<<< HEAD
}

export interface UsersResponse {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
  users: User[];
}

export interface GetUsersParams {
  page: number;
  limit: number;
=======
  createdAt: string;
  updatedAt: string;
>>>>>>> develop
}

