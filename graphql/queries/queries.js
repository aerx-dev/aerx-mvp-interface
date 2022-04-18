//Your GraphQL query or mutation goes here

const GET_ALL_POSTS = `
query {
  feed: postCollection {
    edges {
      post: node {
        id
        description
       
      }
    }
  }
}
`

const GET_POST = `
query {
  post: PostNftCollection {
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
      profle: node {
        id
        username
        fullname
        about_me
        avatar_url

      }
    }
  }
}
`


export { GET_ALL_POSTS,GET_POST, GET_ALL_PROFILES }
