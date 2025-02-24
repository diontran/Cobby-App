export interface TabIconProps {
  color: string;
  size: number;
  focused: boolean;
}

export interface TabBarIconProps {
  color: string;
  size: number;
}

declare module 'expo-router' {
  export const Stack: any;
  export const Tabs: any;
  export const Link: any;
  export const useRouter: any;
  export const useLocalSearchParams: any;
}

declare module '@expo/vector-icons' {
  export { MaterialCommunityIcons } from '@expo/vector-icons';
}

declare module 'expo-image-picker' {
  export const MediaTypeOptions: {
    All: 'all';
    Videos: 'videos';
    Images: 'images';
  };

  export interface ImagePickerResult {
    canceled: boolean;
    assets: Array<{
      uri: string;
      width: number;
      height: number;
      type?: string;
    }>;
  }

  export interface ImagePickerOptions {
    mediaTypes: keyof typeof MediaTypeOptions;
    allowsEditing?: boolean;
    aspect?: [number, number];
    quality?: number;
  }

  export function launchImageLibraryAsync(options?: ImagePickerOptions): Promise<ImagePickerResult>;
  export function requestMediaLibraryPermissionsAsync(): Promise<{ status: string; granted: boolean }>;
} 