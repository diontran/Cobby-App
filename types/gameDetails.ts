import { CardGame, Card } from './game';

export interface GameDetailsProps {
  game: CardGame;
  cards: Card[];
  loading: boolean;
  error: string | null;
}

export interface LearningResource {
  id: string;
  title: string;
  type: 'video' | 'guide' | 'reference';
  url: string;
  description: string;
} 