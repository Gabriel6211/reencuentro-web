import { api } from "@/lib/api/client";
import type { PostRow } from "@/types";

export async function getPosts(params?: {
  status?: string;
  animalType?: string;
}): Promise<PostRow[]> {
  return api.get<PostRow[]>("/api/posts", {
    params: params as Record<string, string> | undefined,
  });
}

export async function getPostById(id: string): Promise<PostRow> {
  return api.get<PostRow>(`/api/posts/${id}`);
}

export async function createPost(data: Omit<PostRow, "id" | "created_at" | "updated_at">): Promise<PostRow> {
  return api.post<PostRow>("/api/posts", data);
}
