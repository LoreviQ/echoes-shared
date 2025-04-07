import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { CharacterAttributes, CharacterAttributesSchema } from "../types";

/**
 * Inserts character attributes into the database
 * @param attributes - The character attributes to insert
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the error
 */
export async function insertCharacterAttributes(
    attributes: CharacterAttributesSchema,
    supabase: SupabaseClient
): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from('character_attributes')
        .insert(attributes);
    return { error };
}

/**
 * Updates character attributes in the database
 * @param character_id - The ID of the character to update
 * @param attributes - The character attributes to update
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the error
 */
export async function updateCharacterAttributes(
    character_id: string,
    attributes: CharacterAttributes,
    supabase: SupabaseClient
): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from('character_attributes')
        .update(attributes)
        .eq('character_id', character_id);
    return { error };
}

/**
 * Gets character attributes from the database
 * @param character_id - The ID of the character to get attributes for
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the attributes and an error
 */
export async function getCharacterAttributes(
    character_id: string,
    supabase: SupabaseClient
): Promise<{ attributes: CharacterAttributes | null; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('character_attributes')
        .select('*')
        .eq('character_id', character_id)
        .single();

    // Remove character_id from the returned data to match CharacterAttributes type
    if (data) {
        const { character_id: _, ...attributes } = data;
        return { attributes, error };
    }

    return { attributes: null, error };
}

/**
 * Upserts character attributes into the database
 * @param character_id - The ID of the character to upsert attributes for
 * @param attributes - The character attributes to upsert
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the error
 */
export async function upsertCharacterAttributes(
    character_id: string,
    attributes: CharacterAttributes,
    supabase: SupabaseClient
): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from('character_attributes')
        .upsert({
            character_id,
            ...attributes
        });
    return { error };
}
