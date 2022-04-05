import { createClient, useQuery } from 'urql';
import "../schemas/"

// Prepare API key and Authorization header
const headers = {
    apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    authorization: `Bearer: ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`
}

// Create GraphQL client
// See: https://formidable.com/open-source/urql/docs/basics/react-preact/#setting-up-the-client
const client = createClient({
    url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/grapqhl/v1`,
    fetchOptions: function createFetchOptions() {
        return { headers }
    },
})



export async function queryPost() {
    // Prepare GraphQL query here
    const postQuery = `
    query {
        postCollection {
            edges {
                node {
                    id
                    ownerId
                }
            }
        }
    }
    `
    // Query for the data
    const [result, reexecuteQuery] = useQuery({
        query: postQuery,
    })

    // Read the result
    const { postData, fetching, error } = result

    if (error) {
        console.log(error)
    }

    console.log({ postData: postData });
    return postData;

}




