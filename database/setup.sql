-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the card_games table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.card_games (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample card games
INSERT INTO public.card_games (name, description, thumbnail_url) VALUES
(
  'One Piece TCG',
  'Join the adventure with Luffy and his crew in this exciting trading card game based on the popular manga and anime series.',
  'https://i.imgur.com/KxuBYSR.jpg'
),
(
  'Pokemon TCG',
  'Catch, collect, and battle with Pokemon in the world''s most popular trading card game.',
  'https://i.imgur.com/RVFHZrv.jpg'
),
(
  'Yu-Gi-Oh!',
  'Duel with powerful monsters, spells, and traps in this strategic card game.',
  'https://i.imgur.com/oCKb9mI.jpg'
),
(
  'Magic: The Gathering',
  'Master the art of spellcasting and strategy in the original trading card game.',
  'https://i.imgur.com/ypYVqYj.jpg'
)
ON CONFLICT (name) DO NOTHING;

-- Create RLS policies for card_games
ALTER TABLE public.card_games ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON public.card_games
  FOR SELECT
  TO public
  USING (true);

-- Create the uploaded_images table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.uploaded_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending',
  analysis_result JSONB
);

-- Create RLS policies for uploaded_images
ALTER TABLE public.uploaded_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own images" ON public.uploaded_images
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own images" ON public.uploaded_images
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Create an index for faster queries
CREATE INDEX IF NOT EXISTS idx_uploaded_images_user_id ON uploaded_images(user_id); 