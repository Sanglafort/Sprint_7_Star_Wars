export interface User {
  accessToken?: string;
  user: {
    id: number;
    email: string;
    password: string;
    name: string;
  }
}

