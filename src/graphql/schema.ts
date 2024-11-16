import gql from 'graphql-tag';

export const typeDefs = gql`
  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String!, email: String!): User
    deleteUser(id: ID!): String
  }

  type User {
    id: ID!
    name: String!
    email: String!
  }
`;
