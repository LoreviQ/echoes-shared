import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { Subscription, UserSubscription } from "../types";

/**
 * Get all subscriptions for a user
 * @param userId - The ID of the user to get subscriptions for
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to an object containing the subscriptions and an error
 */
export async function getSubscriptions(
    userId: string,
    supabase: SupabaseClient
): Promise<{ subscriptions: UserSubscription[]; error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('character_subscriptions')
        .select('character_id')
        .eq('user_id', userId);

    return {
        subscriptions: data || [],
        error
    };
}

/**
 * Subscribe to a character (insert a subscription into the database)
 * @param characterId - The ID of the character to subscribe to
 * @param userId - The ID of the user to subscribe to
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the character ID
 */
export async function insertSubscription(
    subscription: Subscription,
    supabase: SupabaseClient
): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from('character_subscriptions')
        .insert([subscription]);
    return { error }
}

/**
 * Unsubscribe from a character (delete a subscription from the database)
 * @param characterId - The ID of the character to unsubscribe from
 * @param userId - The ID of the user to unsubscribe from
 * @param supabase The Supabase client to use
 * @returns A promise that resolves to the character ID
 */
export async function deleteSubscription(
    subscription: Subscription,
    supabase: SupabaseClient
): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from('character_subscriptions')
        .delete()
        .eq('character_id', subscription.character_id)
        .eq('user_id', subscription.user_id);
    return { error }
}