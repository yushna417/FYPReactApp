export type ImageSource = 'camera' | 'gallery';

export interface ImagePickerResult {
  cancelled: boolean;
  assets?: Array<{
    uri: string;
    width: number;
    height: number;
    type?: string;
    fileName?: string;
    fileSize?: number;
  }>;
}

export interface UseImagePickerReturn {
  selectedImage: string | null;
  isUploading: boolean;
  pickImage: (source: ImageSource) => Promise<void>;
  uploadImage: (userId: string, additionalData?: Record<string, any>) => Promise<string>;
  clearImage: () => void;
  error: string | null;
}

export interface ImageUploadResponse {
  profile_image: string;
  message?: string;
}