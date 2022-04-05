// Prepare our GraphQL query
const GET_ALL_POSTS = `
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

export { GET_ALL_POSTS };





