export type AnimalType = "dog" | "cat" | "other";
export type Status = "lost" | "found" | "adoption";
export type Gender = "male" | "female";

/** Post category: lost pet, found pet, or pet in adoption */
export type PostType = 'lost' | 'found' | 'adoption'

/** Post status: active = issue not solved; found/reunited/adopted = resolved */
export type PostStatus = 'active' | 'found' | 'reunited' | 'adopted'

/**
 * Post model (pet report). Synced with backend API response.
 */
export type Post = {
    title: string
    content: string
    image_urls: string[]
    location: string
    post_type: PostType
    /** active = not solved; found/reunited/adopted = solved */
    status: PostStatus
    /** Last date seen / date lost or found (ISO string) */
    date_lost_or_found: string
    pet_name?: string | null
    pet_age?: number | null
    pet_breed?: string | null
    pet_gender?: string | null
    pet_color?: string | null
    pet_size?: string | null
};

/** Post row from API (includes id, user_id, created_at, updated_at) */
export interface PostRow extends Post {
    id: string
    user_id: string
    created_at: string
    updated_at: string
}

export type CardData = Omit<PostRow, "id">;

/** @deprecated Use PostRow. Kept for backward compatibility. */
export type ReportItem = PostRow;