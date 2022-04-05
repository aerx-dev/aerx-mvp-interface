import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';


const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Upload new post to Supabase
export async function postToSupa(postToSave, toast) {

    //Upload the contentNFT to Supabase

    var postComments = [];
    var comment = "I love this post";
    postComments.push(comment)
    //postToSave.id = postToSave.token_id;
    postToSave.totalcharged = 0;
    postToSave.comments = [];
    postToSave.media_type = 'text';
    postToSave.updatedAt = postToSave.issued_at;
    postToSave.comments = postComments;
    postToSave.status = 'POSTED';
    postToSave.email = "test@near.com";
    const [
        id,
        email,
        owner,
        token_id,
        owner_id,
        post_id,
        description,
        title,
        media,
        media_hash,
        media_type,
        created_at,
        updated_at,
        totalcharged,
        extra,
        status,
        comments,
        body,
    ] = [
            postToSave.id,
            postToSave.email,
            postToSave.id,
            postToSave.token_id,
            postToSave.owner_id,
            postToSave.token_id,
            postToSave.description,
            postToSave.title,
            postToSave.media,
            postToSave.media_hash,
            postToSave.media_type,
            postToSave.issued_at,
            postToSave.updatedAt,
            postToSave.totalcharged,
            postToSave.extra,
            postToSave.status,
            postToSave.comments,
            postToSave.description

        ];


    console.log({
        id: id,
        owner: owner,
        token_id: token_id,
        owner_id: owner_id,
        post_id: post_id,
        description: description,
        title: title,
        media: media,
        media_hash: media_hash,
        media_type: media_type,
        created_at: created_at,
        updated_at: updated_at,
        totalcharged: totalcharged,
        extra: extra,
        status: status,
        comments: comments,
    }


    );

    // Insert into account
    const { data: aaccountData, error: accountError } = await supabase.from("account").insert([{
        id,
        email,
        owner,
        created_at,
        updated_at
    }]);

    console.log({ aaccountData: aaccountData })

    //Insert into table `post`
    const { data: postData, error: postError } = await supabase.from("post").insert([{
        id,
        owner,
        owner_id,
        description,
        created_at,
        updated_at
    }]);

    console.log({ postData: postData })

    const { data: postNFT, error: postNFTError } = await supabase.from("post_nft").insert([{
        post_id,
        title,
        media,
        media_hash,
        media_type,
        token_id,
        totalcharged,
        extra,
        body,
        status,
        created_at,
        updated_at,
        comments,
        token_id

    }]);

    console.log({ postNFT: postNFT })
    if (accountError) {
        toast(
            "error",
            "Post could not be uploaded to Supabase! Error: " + accountError.message, "supaErr"
        );
        throw accountError

    }
    else if (postError) {
        toast(
            "error",
            "Post could not be uploaded to Supabase! Error: " + postError.message, "supaErr"
        );
        throw postError

    }

    else if (postNFTError) {
        toast(
            "error",
            "Post could not be uploaded to Supabase! Error: " + postNFTError.message, "supaErr"
        );
        throw postNFTError
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