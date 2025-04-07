import { PostgrestError, SupabaseClient } from "@supabase/supabase-js";

import { SupabaseCellReference } from "../types";

/**
 * Updates a row in a table based on a reference
 * @param reference - The reference to the row to update
 * @param updateData - The data to update the row with
 * @param supabase - The Supabase client to use
 * @returns A promise that resolves to the error
 */
export async function updateByReference(
    reference: SupabaseCellReference,
    updateData: any,
    supabase: SupabaseClient
): Promise<{ error: PostgrestError | null }> {
    const { error } = await supabase
        .from(reference.tableName)
        .update({ [reference.columnName]: updateData })
        .eq('id', reference.id);
    return { error };
}