import { createClient } from '@/lib/supabase/client'

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export interface UploadResponse {
  success: boolean
  url: string
  key: string
  size: number
  type: string
}

/**
 * Upload a file to the backend API
 */
export async function uploadFile(file: File): Promise<UploadResponse> {
  // Get the current session token
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) {
    throw new Error('You must be logged in to upload files')
  }

  // Create form data
  const formData = new FormData()
  formData.append('file', file)

  // Upload to backend
  const response = await fetch(`${BACKEND_URL}/api/upload`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${session.access_token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: response.statusText }))
    throw new Error(error.error || 'Failed to upload file')
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    throw new Error('Unexpected empty response from upload endpoint')
  }

  // Check Content-Length header for empty responses
  const contentLength = response.headers.get("Content-Length")
  if (contentLength === "0") {
    throw new Error('Unexpected empty response from upload endpoint')
  }

  // Try to parse JSON, handle empty body gracefully
  try {
    const text = await response.text()
    if (!text || text.trim().length === 0) {
      throw new Error('Unexpected empty response from upload endpoint')
    }
    return JSON.parse(text) as UploadResponse
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('Invalid JSON response from upload endpoint')
    }
    throw error
  }
}
