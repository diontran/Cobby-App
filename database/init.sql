-- Create the card_games table
CREATE TABLE card_games (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_card_games_updated_at
    BEFORE UPDATE ON card_games
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample card games
INSERT INTO card_games (name, description, thumbnail_url) VALUES
(
  'One Piece TCG',
  'Join the adventure with Luffy and his crew in this exciting trading card game based on the popular manga and anime series.',
  'https://onepiece-cardgame.com/images/common/home/slider_1.jpg'
),
(
  'Pokemon TCG',
  'Catch, collect, and battle with Pokemon in the world''s most popular trading card game.',
  'https://assets.pokemon.com/assets/cms2/img/cards/web/SM1/SM1_EN_1.png'
),
(
  'Yu-Gi-Oh!',
  'Duel with powerful monsters, spells, and traps in this strategic card game.',
  'https://www.konami.com/yugioh/duel_links/images/world/dm/story_kv.jpg'
),
(
  'Magic: The Gathering',
  'Master the art of spellcasting and strategy in the original trading card game.',
  'https://magic.wizards.com/sites/default/files/images/wallpaper/wallpaper-default.jpg'
); 