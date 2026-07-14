// Тимчасово створено для тесту Join секції
// export interface User {
//   email: string;
//   username: string;
//   avatar: string;
// }

export interface User {
  _id: string;
  name: string;
  avatarUrl?: string;
  articlesAmount?: number;
  savedArticles?: string[];
  email?: string;
}

