import { createClient } from '@supabase/supabase-js'
import { v4 as uuidv4 } from 'uuid';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Upload new post to Supabase
export async function postToSupa(postToSave, toast) {

    //Upload the contentNFT to Supabase
    //postToSave.id = uuidv4();
    postToSave.totalcharged = 0;
    postToSave.owner_id = res.owner_id;
    postToSave.comments = [];
    postToSave.media_type = 'text';
    const [
        id,
        owner_id,
        title,
        description,
        media,
        media_hash,
        media_type,
        issued_at,
        totalcharged,
        extra,
        comments,
    ] = [
            postToSave.id,
            postToSave.owner_id,
            postToSave.title,
            postToSave.description,
            postToSave.media,
            postToSave.media_hash,
            postToSave.media_type,
            postToSave.issued_at,
            postToSave.totalcharged,
            postToSave.extra,
            postToSave.comments,
        ]
    const { data, error } = await supabase.from("postnft").insert([{
        id,
        owner_id,
        title,
        description,
        media,
        media_hash,
        media_type,
        issued_at,
        extra,
        totalcharged,
        comments

    }]);

    console.log("data uploaded to supabase", data)

    if (error) {
        toast(
            "error",
            "Post could not be uploaded to Supabase! Error: " + error.message, "supaErr"
        );
        throw error
    } else {
        console.log(" Uploaded successfully to Supabase"), "supaSuccess"
        // redirect back to feed
    }
}

export async function fileUpload(file) {
    if (file) {
        const { data, error } = await supabase.storage.from('contentnft').upload(file.name, file, {
            cacheControl: '3600',
            upsert: false
        });

        console.log("File uploaded to supabase", file)
        if (error) {
            toast(
                "error",
                "File could not be uploaded! Error: " + error.message,
            );
            throw error
        } else {
            console.log(data + " Uploaded successfully to Supabase")
        }
    } else {
        console.log(`Error! Please check the ${file} and try again.`)
    }

}