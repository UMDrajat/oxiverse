import fs from 'fs/promises';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { supabaseAdmin } from './supabase';

export interface StorageResult {
  url: string; // Primarially local for now
  localUrl: string;
  supabaseUrl: string | null;
  fileName: string;
}

export async function saveFile(file: File, subDir: string = 'images'): Promise<StorageResult> {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileExt = file.name.split('.').pop();
  const fileName = `${uuidv4()}.${fileExt}`;
  
  // 1. Local Upload (Skip or fail gracefully in serverless/production)
  let localUrl = `/uploads/${subDir}/${fileName}`;
  const isVercel = process.env.VERCEL === '1';
  
  if (!isVercel) {
    try {
      const uploadDir = path.join(process.cwd(), 'public', 'uploads', subDir);
      await fs.mkdir(uploadDir, { recursive: true });
      const filePath = path.join(uploadDir, fileName);
      await fs.writeFile(filePath, buffer);
    } catch (err) {
      console.warn('Local filesystem write failed (likely EROFS):', err);
      // In production/serverless, this is expected to fail. We proceed with Supabase.
    }
  }

  // 2. Supabase Upload (Backup)
  let supabaseUrl = null;
  try {
    const bucketName = 'images'; // Standard bucket for all assets
    const bucketPath = `${subDir}/${fileName}`;
    
    const { data, error } = await supabaseAdmin.storage
      .from(bucketName)
      .upload(bucketPath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (error) {
      console.error('Supabase upload failed:', error.message);
    } else if (data) {
      const { data: publicData } = supabaseAdmin.storage
        .from(bucketName)
        .getPublicUrl(bucketPath);
      supabaseUrl = publicData.publicUrl;
    }
  } catch (err) {
    console.error('An unexpected error occurred during Supabase backup:', err);
  }

  return {
    url: supabaseUrl || localUrl, // Use Supabase for optimization, fallback to local
    localUrl,
    supabaseUrl,
    fileName,
  };
}
