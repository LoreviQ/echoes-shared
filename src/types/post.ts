export type PostSchema = {
    id: string;
    character_id: string;
    content: string;
    created_at: string;
    updated_at: string;
}

// partial post for database operations
export type PartialPost = Partial<Omit<PostSchema, 'id' | 'created_at' | 'updated_at'>>;