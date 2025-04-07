import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { Character, PartialCharacter, CharacterSchema, NsfwFilter } from "../types";

/**
 * Type for characters with subscription counts
 */
type CharacterWithSubscriptionCount = CharacterSchema & {
    character_subscription_counts?: {
        subscriber_count: number;
    }[] | null;
}

/**
 * Transforms character data
 * @param data - The character data to transform
 * @returns The transformed character data
 */
function transformCharacterData(data: CharacterWithSubscriptionCount | null): Character | null {
    if (!data) return null;

    return {
        ...data,
        subscriber_count: data.character_subscription_counts?.[0]?.subscriber_count ?? 0
    };
}

/**
 * Gets a character from the database
 * @param id - The ID of the character to get
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the character and an error
 */
export async function getCharacter(
    id: string,
    supabase: SupabaseClient
): Promise<{ character: Character | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('characters')
        .select(`
            *,
            character_subscription_counts (
                subscriber_count
            )
        `)
        .eq('id', id)
        .single();
    return { character: transformCharacterData(data), error };
}

/**
 * Gets a character from the database by path
 * @param path - The path of the character to get
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the character and an error
 */
export async function getCharacterByPath(
    path: string,
    supabase: SupabaseClient
): Promise<{ character: Character | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('characters')
        .select(`
            *,
            character_subscription_counts (
                subscriber_count
            )
        `)
        .eq('path', path)
        .single();

    return { character: transformCharacterData(data), error };
}

/**
 * Gets all characters from the database
 * @param nsfwFilter - The nsfw filter to apply
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the characters and an error
 */
export async function getCharacters(
    nsfwFilter: NsfwFilter = 'hide',
    supabase: SupabaseClient
): Promise<{ characters: Character[]; error: PostgrestError | null }> {
    const charactersQuery = supabase
        .from('characters')
        .select(`
            *,
            character_subscription_counts (
                subscriber_count
            )
        `)
        .eq('public', true)
    // if nsfwFilter is hide, hide nsfw characters
    if (nsfwFilter === 'hide') {
        charactersQuery.neq('nsfw', true);
    }

    const { data, error } = await charactersQuery.order('created_at', { ascending: false });;
    return {
        characters: (data || []).map(transformCharacterData) as Character[],
        error
    };
}

/**
 * Inserts a new character into the database (user_id is automatically logged in user due to supabase function triggers)
 * @param character - The character to insert
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the error or null
 */
export async function insertCharacter(
    character: PartialCharacter,
    supabase: SupabaseClient
): Promise<{ character_id: string | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('characters')
        .insert(character)
        .select('id')
        .single();
    return { character_id: data?.id, error };
}

/**
 * Updates any fields of a character in the database
 * @param id - The ID of the character to update
 * @param updates - Partial object containing any character fields to update
 * @param supabase - The Supabase client to use
 */
export async function updateCharacter(
    id: string,
    updates: PartialCharacter,
    supabase: SupabaseClient
): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from('characters')
        .update(updates)
        .eq('id', id);
    return { error };
}