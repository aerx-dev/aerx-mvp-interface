//Your GraphQL query or mutation goes here

const GET_ALL_POSTS = `
query {
  posts: postCollection {
    edges {
      post: node {
        id
        ownerId
        title
        description
        createdAt
        updatedAt
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
        id
        description
       
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
        id
        hobbys,
        tokenId,
        username,
        fullname,
        aboutMe,
        city,
        country,
        avatarUrl,
        extra,
        createdAt,
        updatedAt,
      }
    }
  }
}
`


export { GET_ALL_POSTS, GET_POST, GET_ALL_PROFILES }
