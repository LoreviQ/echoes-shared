import { AuthError, SupabaseClient, User as SupabaseUser } from "@supabase/supabase-js";

import { User, UserPreferencesSchema, UserPreferencesSupabase, UserPersonas, UserPersonasSchema } from "../types";

/**
 * Gets the logged in user
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the user and an error
 */
export async function getLoggedInUser(
    supabase: SupabaseClient
): Promise<{ user: User | null; error: AuthError | null }> {
    // Get the user
    const { data, error } = await supabase.auth.getUser() as { data: { user: SupabaseUser } | null, error: AuthError | null };
    if (error || !data) {
        return { user: null, error };
    }
    // Get the user preferences
    const { data: preferences, error: preferencesError } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', data.user.id)
        .single() as { data: UserPreferencesSchema | null, error: AuthError | null };
    if (preferencesError) {
        return { user: null, error: preferencesError };
    }

    // Return the user with the preferences, omitting user_id from preferences
    const { user_id, ...preferencesWithoutId } = preferences || {};
    const user = {
        ...data.user,
        preferences: preferencesWithoutId as UserPreferencesSupabase
    } as User;
    return { user, error: null };
}

/**
 * Updates the user preferences
 * @param userId - The ID of the user to update
 * @param preferences - The preferences to update
 * @param supabase - The Supabase client to use
 */
export async function updateUserPreferences(
    userId: string,
    preferences: UserPreferencesSupabase,
    supabase: SupabaseClient
) {
    const { error } = await supabase
        .from('user_preferences')
        .update(preferences)
        .eq('user_id', userId);

    return { error };
}

/**
 * Gets the user personas
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the personas and an error
 */
export async function getUserPersonas(
    supabase: SupabaseClient
) {
    const { data, error } = await supabase
        .from('user_personas')
        .select('*') as { data: UserPersonasSchema[] | null, error: AuthError | null };
    if (error || !data) {
        return { personas: null, error };
    }
    // Get the signed url for the avatars
    for (const persona of data) {
        const { data: signedUrl } = await supabase
            .storage
            .from('user-data')
            .createSignedUrl(`${persona.user_id}/persona_avatars/${persona.id}.jpg`, 60 * 60 * 24);
        persona.avatar_url = signedUrl?.signedUrl || null;
    }

    return {
        personas: data as UserPersonasSchema[] | null,
        error: null
    };
}

/**
 * Updates a user persona
 * @param personaId - The ID of the persona to update
 * @param persona - The persona to update
 * @param supabase - The Supabase client to use
 */
export async function updateUserPersona(
    personaId: string,
    persona: UserPersonas,
    supabase: SupabaseClient
) {
    const { error } = await supabase
        .from('user_personas')
        .update(persona)
        .eq('id', personaId);

    return { error };
}

/**
 * Deletes a user persona
 * @param personaId - The ID of the persona to delete
 * @param supabase - The Supabase client to use
 */
export async function deleteUserPersona(
    personaId: string,
    supabase: SupabaseClient
) {
    const { error } = await supabase
        .from('user_personas')
        .delete()
        .eq('id', personaId);

    return { error };
}

/**
 * Inserts a user persona
 * @param persona - The persona to insert
 * @param supabase - The Supabase client to use
 */
export async function insertUserPersona(
    persona: UserPersonas,
    supabase: SupabaseClient
) {
    const { error } = await supabase
        .from('user_personas')
        .insert(persona)


    return { error };
}

/**
 * Gets the user preferences
 * @param userId - The ID of the user to get preferences for
 * @param supabase - The Supabase client to use
 */
export async function getUserPreferences(
    userId: string,
    supabase: SupabaseClient
) {
    const { data, error } = await supabase
        .from('user_preferences')
        .select('*')
        .eq('user_id', userId)
        .single() as { data: UserPreferencesSchema | null, error: AuthError | null };

    if (error || !data) {
        return { preferences: null, error };
    }

    // Remove user_id from the preferences before returning
    const { user_id, ...preferencesWithoutId } = data;
    return {
        preferences: preferencesWithoutId as UserPreferencesSupabase,
        error: null
    };
}