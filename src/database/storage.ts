import { SupabaseClient } from "@supabase/supabase-js";
import { StorageError } from "@supabase/storage-js";

/**
 * Uploads a file to storage
 * @param bucketName - The name of the bucket to upload to
 * @param filePath - The path to upload the file to
 * @param file - The file to upload
 * @param supabase - The Supabase client to use
 */
export async function upload(
    bucketName: string,
    filePath: string,
    file: File,
    supabase: SupabaseClient
): Promise<{ publicUrl: string; error: StorageError | null }> {
    // upload file to storage
    const { error } = await supabase
        .storage
        .from(bucketName)
        .upload(filePath, file, {
            upsert: true
        });

    // get public url
    const { data: { publicUrl } } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return { publicUrl, error };
}

/**
 * Uploads a file to storage for the authenticated user
 * @param subPath - The path to upload the file to
 * @param file - The file to upload
 * @param supabase - The Supabase client to use
 */
export async function uploadAuth(
    subPath: string,
    file: File,
    supabase: SupabaseClient
): Promise<{ publicUrl: string; error: StorageError | null }> {
    // Get the current authenticated user
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    // Build the path: user_data/user_id/subPath
    const bucketName = "user-data";
    const filePath = `${user.id}/${subPath}`;

    // Upload file to storage
    const { error } = await supabase
        .storage
        .from(bucketName)
        .upload(filePath, file, {
            upsert: true
        });

    // Get public URL
    const { data: { publicUrl } } = supabase
        .storage
        .from(bucketName)
        .getPublicUrl(filePath);

    return { publicUrl, error };
}

