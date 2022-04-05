import { createClient, useQuery } from 'urql';

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

// Prepare our GraphQL query
const GetAllPostsQuery = `
  query {
    postCollection {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`

const [AllPosts, reexecuteQuery] = useQuery({
    query: GetAllPostsQuery,
  })
  
  // Read the result
const { data: GET_ALL_POSTS, fetching: GET_ALL_POSTS_FETCHING, error: GET_ALL_POSTS_ERROR } = AllPosts;

export { GET_ALL_POSTS, GET_ALL_POSTS_FETCHING, GET_ALL_POSTS_ERROR };





