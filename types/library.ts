export interface UploadedImage {
  id: string;
  user_id: string;
  image_url: string;
  uploaded_at: string;
  status: 'pending' | 'analyzed' | 'failed';
  analysis_result?: {
    cards: Array<{
      name: string;
      confidence: number;
      price?: number;
    }>;
  } | null;
} 