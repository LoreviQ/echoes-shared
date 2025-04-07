import type { UserMetadata } from "@supabase/supabase-js";
import type { UserPreferencesSupabase } from "./user";

export interface SessionStatus {
    active: boolean;
    user: UserMetadata | null;
    preferences: UserPreferencesSupabase | null;
}