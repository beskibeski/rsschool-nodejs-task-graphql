import { GraphQLObjectType, GraphQLString } from "graphql";

const rootQuery = new GraphQLObjectType ({
  name: 'Query',
  fields: {
    memberTypes: {
      type: GraphQLString,
      resolve: () => true,
    }
  }
});

export default rootQuery;