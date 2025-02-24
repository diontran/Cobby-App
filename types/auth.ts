export interface User {
  id: string;
  email: string;
  username: string | null;
  avatar_url: string | null;
}

export interface AuthState {
  user: User | null;
  session: any | null;
  loading: boolean;
} 