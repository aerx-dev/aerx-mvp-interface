//Your GraphQL query or mutation goes here

const GET_ALL_POSTS = `
query {
  posts: postCollection {
    edges {
      post: node {
        id,
        owner_id,
        title,
        description,
        created_at,
        updated_at,
      }
    }
  }
}
`

/* Variables for GET POST

Variables need to be sent as a part of GQL Reqeust
{
    "postId": 1
}

*/
const GET_POST = `
query GetPostById($postId: Int!) {
  post: postCollection(filter: { id: { eq: $postId } }) {
    edges {
      post: node {
        id,
        description,
       
      }
    }
  }
}
`
/* Variables for GET POST OWNER_ID

Variables need to be sent as a part of GQL Reqeust
{
    "owner_id": 1
}

*/
const GET_POST_OWNER = `
query GetPostById($owner_id: Int!) {
  post: postCollection(filter: { id: { eq: $owner_id } }) {
    edges {
      post: node {
        owner_id,
        description,
       
      }
    }
  }
}
`

const GET_ALL_PROFILES = `
query {
  profiles: profileCollection {
    edges {
      profile: node {
        id,
        hobbys,
        token_id,
        username,
        fullname,
        about_me,
        city,
        country,
        avatar_url,
        extra,
        created_at,
        updated_at,
      }
    }
  }
}
`


export { GET_ALL_POSTS, GET_POST, GET_POST_OWNER, GET_ALL_PROFILES }
