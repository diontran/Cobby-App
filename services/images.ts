import { supabase } from '../lib/supabase';
import * as FileSystem from 'expo-file-system';
import { UploadedImage } from '../types/library';

export async function uploadImage(uri: string): Promise<UploadedImage> {
  try {
    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) throw new Error('User not authenticated');

    // Check if the file exists
    const fileInfo = await FileSystem.getInfoAsync(uri);
    if (!fileInfo.exists) {
      throw new Error('File does not exist');
    }

    // First, read the file
    const base64 = await FileSystem.readAsStringAsync(uri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    // Generate a unique filename
    const filename = `${Date.now()}.jpg`;
    const filePath = `uploads/${user.id}/${filename}`; // Add user ID to path

    // Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('card-images')
      .upload(filePath, decode(base64), {
        contentType: 'image/jpeg',
        upsert: false
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw uploadError;
    }

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from('card-images')
      .getPublicUrl(filePath);

    // Create a record in the uploaded_images table
    const { data: imageRecord, error: dbError } = await supabase
      .from('uploaded_images')
      .insert({
        user_id: user.id, // Add user ID to the record
        image_url: publicUrl,
        status: 'pending',
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database insert error:', dbError);
      throw dbError;
    }

    return imageRecord;
  } catch (error) {
    console.error('Error in uploadImage:', error);
    throw error;
  }
}

export async function getUploadedImages(): Promise<UploadedImage[]> {
  // Get current user
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return [];

  const { data, error } = await supabase
    .from('uploaded_images')
    .select('*')
    .eq('user_id', user.id) // Only get current user's images
    .order('uploaded_at', { ascending: false });

  if (error) throw error;
  return data || [];
}

// Helper function to decode base64
function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
} 