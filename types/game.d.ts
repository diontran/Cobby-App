export interface CardGame {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string | number;
  created_at?: string;
  updated_at?: string;
}

export interface GameLesson {
  id: string;
  game_id: string;
  title: string;
  description: string;
  content: string;
  order: number;
} 