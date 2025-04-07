import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { PostSchema } from "../types";

/**
 * Gets a post from the database
 * @param id - The ID of the post to get
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the post and an error
 */
export async function getPost(
    id: string,
    supabase: SupabaseClient
): Promise<{ post: PostSchema | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('id', id)
        .single();
    return { post: data, error };
}

/**
 * Gets posts by character ID
 * @param id - The ID of the character to get posts for
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the posts and an error
 */
export async function getPostsByCharacterId(
    id: string,
    supabase: SupabaseClient
): Promise<{ posts: PostSchema[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('character_id', id)
        .order('created_at', { ascending: false });
    return { posts: data || [], error };
}