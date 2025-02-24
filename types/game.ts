export interface CardGame {
  id: string;
  name: string;
  description: string;
  thumbnail_url: string;
  created_at: string;
  updated_at: string;
}

export interface Card {
  id: string;
  game_id: string;
  name: string;
  image_url: string;
  description: string;
  current_price: number;
  last_updated: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  game_id: string;
  progress_percentage: number;
  last_accessed: string;
} 