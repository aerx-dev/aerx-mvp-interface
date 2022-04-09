//Your GraphQL query or mutation goes here

const GET_ALL_POSTS = `
query {
  feed: postCollection {
    edges {
      post: node {
        id
        title
       
      }
    }
  }
}
`

export { GET_ALL_POSTS }
