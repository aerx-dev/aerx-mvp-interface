import { supabaseGraphQL } from "../../supabaseClient";
import { supabase } from "../../supabaseClient";
import { useQuery as graphqlQuery } from 'urql';
import "../schemas"

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
    const [result, reexecuteQuery] = graphqlQuery({
        query: postQuery,
    })

    // Read the result
    const { postData, fetching, error } = result

    if (error) {
        console.log(error)
    }

    console.log({ postData: postData });
    return  postData;

}




