import { createClient as supabaseClient } from "@supabase/supabase-js";
import { v4 as uuidv4 } from "uuid";
import { createClient as urqlClient } from "urql";

// Prepare API key and Authorization header
const headers = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    authorization: `Bearer: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
};

// Create GraphQL client
// See: https://formidable.com/open-source/urql/docs/basics/react-preact/#setting-up-the-client

export const supabaseGraphQLClient = urqlClient({
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/graphql/v1`,
    fetchOptions: function createFetchOptions() {
        return { headers };
    },
});

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = supabaseClient(supabaseUrl, supabaseAnonKey);

// Upload new post to Supabase
export async function postToSupa(postToSave, toast) {
    //Upload the contentNFT to Supabase
    postToSave.totalCharged = 0;
    postToSave.media_type = "text";
    postToSave.updatedAt = postToSave.issued_at;
    const [
        owner_id,
        post_id,
        token_id,
        description,
        title,
        media,
        media_hash,
        media_type,
        created_at,
        updated_at,
        extra,
        total_charged,
    ] = [
        postToSave.ownerId,
        postToSave.postId,
        postToSave.tokenId,
        postToSave.description,
        postToSave.title,
        postToSave.media,
        postToSave.media_hash,
        postToSave.media_type,
        postToSave.issued_at,
        postToSave.updatedAt,
        postToSave.extra,
        postToSave.totalCharged,
    ];

    // Insert into account
    const { data, error } = await supabase.from("post").insert([
        {
            owner_id,
            post_id,
            token_id,
            description,
            title,
            media,
            media_hash,
            media_type,
            created_at,
            updated_at,
            extra,
            total_charged,
        },
    ]);

    if (error) {
        toast(
            "error",
            "Post could not be uploaded to Supabase! Error: " + error.message,
            "supaErr",
        );
        throw error;
    } else {
        console.log("Uploaded successfully to Supabase", data);
        // redirect back to feed
    }
}

export async function profileToSupa(profileToSave, toast) {
    profileToSave.hobbys = "";
    profileToSave.city = "NY";
    profileToSave.country = "USA";
    profileToSave.updatedAt = null;

    console.log({dataFormat: profileToSave.issued_at})

    const [
        hobbys,
        username,
        fullname,
        about_me,
        city,
        country,
        avatar_url,
        extra,
        created_at,
        updated_at,
    ] = [
        profileToSave.hobbys,
        profileToSave.username,
        profileToSave.title,
        profileToSave.description,
        profileToSave.city,
        profileToSave.country,
        profileToSave.media,
        profileToSave.extra,
        profileToSave.issued_at,
        profileToSave.updatedAt,
    ];

    // Insert into Profile
    const { data, error } = await supabase
        .from("profile")
        .insert([
            {
                hobbys,
                username,
                fullname,
                about_me,
                city,
                country,
                avatar_url,
                extra,
                created_at,
                updated_at,
            },
        ]);

    if (error) {
        toast(
            "error",
            "Post could not be uploaded to Supabase! Error: " + error.message,
            "supaErr",
        );
        throw error;
    } else {
        console.log("Uploaded successfully to Supabase", data);
        // redirect back to feed
    }
}

export async function fileUpload(file) {
    if (file) {
        const { data, error } = await supabase.storage
            .from("contentnft")
            .upload(file.name, file, {
                cacheControl: "3600",
                upsert: false,
            });

        console.log("File uploaded to supabase", file);
        if (error) {
            toast(
                "error",
                "File could not be uploaded! Error: " + error.message,
            );
            throw error;
        } else {
            console.log(data + " Uploaded successfully to Supabase");
        }
    } else {
        console.log(`Error! Please check the ${file} and try again.`);
    }
}
