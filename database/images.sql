-- Create the uploaded_images table
CREATE TABLE uploaded_images (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  image_url TEXT NOT NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  status TEXT DEFAULT 'pending',
  analysis_result JSONB
);

-- Create an index for faster queries
CREATE INDEX idx_uploaded_images_user_id ON uploaded_images(user_id); 