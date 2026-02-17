import { api } from "@/lib/api/client";
import type { PostRow, PostType, PostStatus, AnimalType } from "@/types";

export interface GetPostsParams {
  status?: PostType | PostStatus;
  animalType?: AnimalType;
}

export async function getPosts(params?: GetPostsParams): Promise<PostRow[]> {
  const queryParams: Record<string, string> = {};
  
  if (params?.status) {
    queryParams.status = params.status;
  }
  
  if (params?.animalType) {
    queryParams.animalType = params.animalType;
  }
  
  return api.get<PostRow[]>("/api/posts", {
    params: Object.keys(queryParams).length > 0 ? queryParams : undefined,
  });
}

export async function getPostById(id: string): Promise<PostRow> {
  return api.get<PostRow>(`/api/posts/${id}`);
}

export async function createPost(data: Omit<PostRow, "id" | "created_at" | "updated_at">): Promise<PostRow> {
  return api.post<PostRow>("/api/posts", data);
}
