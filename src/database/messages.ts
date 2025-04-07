import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { Message, CreateMessage } from '../types';

/**
 * Get all messages for a thread
 * @param threadId - The ID of the thread to get messages for
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to an object containing the messages and an error
 */
export async function getMessages(threadId: string, supabase: SupabaseClient): Promise<{ messages: Message[], error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true });
    return { messages: data || [], error };
}

/**
 * Creates a message
 * @param message - The message to create
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the created message and an error
 */
export async function insertMessage(message: CreateMessage, supabase: SupabaseClient): Promise<{ message: Message, error: PostgrestError | null }> {
    const { data, error } = await supabase
        .from('messages')
        .insert(message)
        .select()
        .single();
    return { message: data, error };
}

/**
 * Creates a subscription to messages for a specific thread
 * @param threadId - The ID of the thread to subscribe to
 * @param onMessage - Callback function that receives new messages
 * @param supabase - The Supabase client to use
 * @returns The subscription object that can be used to unsubscribe
 */
export function createMessageSubscription(
    threadId: string,
    onMessage: (payload: { new: Message }) => void,
    supabase: SupabaseClient
) {
    return supabase
        .channel('messages_changes')
        .on('postgres_changes',
            {
                event: 'INSERT',
                schema: 'public',
                table: 'messages',
                filter: `thread_id=eq.${threadId}`
            },
            onMessage
        )
        .subscribe();
}

