import { PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { getR2Client } from './client'

function getBucketName(): string {
  const bucketName = process.env.R2_BUCKET_NAME
  if (!bucketName) {
    throw new Error('R2_BUCKET_NAME is not set in your .env file')
  }
  return bucketName
}

export interface UploadOptions {
  key: string
  body: Buffer | Uint8Array | string
  contentType?: string
  metadata?: Record<string, string>
}

/**
 * Upload a file to R2 bucket
 */
export async function uploadToR2(options: UploadOptions): Promise<string> {
  const { key, body, contentType, metadata } = options
  const client = getR2Client()

  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    Body: body,
    ContentType: contentType,
    Metadata: metadata,
  })

  await client.send(command)

  // Return the public URL if R2_PUBLIC_URL is set, otherwise return the key
  const publicUrl = process.env.R2_PUBLIC_URL
  if (publicUrl) {
    return `${publicUrl}/${key}`
  }

  return key
}

/**
 * Generate a presigned URL for uploading a file (client-side upload)
 */
export async function getPresignedUploadUrl(
  key: string,
  contentType: string,
  expiresIn: number = 3600
): Promise<string> {
  const client = getR2Client()

  const command = new PutObjectCommand({
    Bucket: getBucketName(),
    Key: key,
    ContentType: contentType,
  })

  return await getSignedUrl(client, command, { expiresIn })
}

/**
 * Generate a presigned URL for downloading/viewing a file
 */
export async function getPresignedDownloadUrl(
  key: string,
  expiresIn: number = 3600
): Promise<string> {
  const client = getR2Client()

  const command = new GetObjectCommand({
    Bucket: getBucketName(),
    Key: key,
  })

  return await getSignedUrl(client, command, { expiresIn })
}

/**
 * Get the public URL for a file (if R2_PUBLIC_URL is configured)
 */
export function getPublicUrl(key: string): string | null {
  const publicUrl = process.env.R2_PUBLIC_URL
  if (!publicUrl) {
    return null
  }
  return `${publicUrl}/${key}`
}
