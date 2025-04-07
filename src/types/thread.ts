export type ThreadSchema = {
    id: string;
    user_id: string;
    character_id: string;
    title: string;
    created_at: string;
    updated_at: string;
}

// Type for creating a new thread - only includes fields that need to be provided
export type CreateThread = Omit<ThreadSchema, 'id' | 'created_at' | 'updated_at' | 'user_id'>;

export type ThreadIDs = Pick<ThreadSchema, 'id' | 'character_id' | 'user_id'>;