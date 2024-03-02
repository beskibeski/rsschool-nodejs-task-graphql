import { GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { UserType } from './user.js';
import { prisma } from '../services/prismaClient.js';

export const PostType = new GraphQLObjectType({
  name: 'PostType',
  fields: () => ({
    id: { type: UUIDType },
    title: { type: GraphQLString },
    content: { type: GraphQLString },
    authorId: { type: UUIDType},
    author: {
      type: UserType,      
      resolve: async ({ authorId } ) => await prisma.memberType.findUnique({ where: { id: authorId } }),      
    }
  }),
});

export const PostsType = new GraphQLList(PostType);
