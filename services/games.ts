import { supabase } from '../lib/supabase';
import { CardGame, Card, UserProgress } from '../types/game';

const GAME_IMAGES = {
  'One Piece TCG': require('../../assets/images/onepiece-tcg.jpg'),
  'Pokemon TCG': require('../../assets/images/pokemon-tcg.jpg'),
  'Yu-Gi-Oh!': require('../../assets/images/yugioh.jpg'),
  'Magic: The Gathering': require('../../assets/images/mtg.jpg'),
};

export async function getCardGames(): Promise<CardGame[]> {
  const { data, error } = await supabase
    .from('card_games')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  
  // Use local images instead of URLs
  return (data || []).map(game => ({
    ...game,
    thumbnail_url: GAME_IMAGES[game.name]
  }));
}

export async function getGameDetails(gameId: string): Promise<CardGame | null> {
  const { data, error } = await supabase
    .from('card_games')
    .select('*')
    .eq('id', gameId)
    .single();

  if (error) throw error;
  return data;
}

export async function getUserProgress(userId: string, gameId: string): Promise<UserProgress | null> {
  const { data, error } = await supabase
    .from('user_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('game_id', gameId)
    .single();

  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
  return data;
}

export async function getLearningResources(gameId: string): Promise<LearningResource[]> {
  const { data, error } = await supabase
    .from('learning_resources')
    .select('*')
    .eq('game_id', gameId)
    .order('order', { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function insertSampleGames() {
  const sampleGames = [
    {
      name: 'One Piece TCG',
      description: 'Join the adventure with Luffy and his crew in this exciting trading card game based on the popular manga and anime series.',
      thumbnail_url: GAME_IMAGES['One Piece TCG'],
    },
    {
      name: 'Pokemon TCG',
      description: 'Catch, collect, and battle with Pokemon in the world\'s most popular trading card game.',
      thumbnail_url: GAME_IMAGES['Pokemon TCG'],
    },
    {
      name: 'Yu-Gi-Oh!',
      description: 'Duel with powerful monsters, spells, and traps in this strategic card game.',
      thumbnail_url: GAME_IMAGES['Yu-Gi-Oh!'],
    },
    {
      name: 'Magic: The Gathering',
      description: 'Master the art of spellcasting and strategy in the original trading card game.',
      thumbnail_url: GAME_IMAGES['Magic: The Gathering'],
    }
  ];

  const { error } = await supabase
    .from('card_games')
    .upsert(sampleGames, { onConflict: 'name' });

  if (error) throw error;
} 