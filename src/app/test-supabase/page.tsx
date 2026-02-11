import { createClient } from '@/lib/supabase/server'
import { getPublicUrl } from '@/lib/r2/upload'

import Image from 'next/image'

export default async function TestPage() {
  const supabase = await createClient()

  const photo = getPublicUrl('Photo.jpeg')
  
  // This will fail if tables don't exist yet, but will test connection
  const { data, error } = await supabase
    .from('lost_pets')
    .select('count')
    .limit(1)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">Supabase Connection Test</h1>
      {error ? (
        <p className="text-red-500">Error: {error.message}</p>
      ) : (
        <p className="text-green-500">✓ Connected to Supabase!</p>
      )}
      {photo && <Image src={photo} alt="Photo" width={100} height={100} />}
    </div>
  )
}