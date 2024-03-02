import { GraphQLFloat, GraphQLList, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostsType } from './post.js';
import { prisma } from '../services/prismaClient.js';

export const UserType = new GraphQLObjectType({
  name: 'userType',
  fields: () => ({
    id: { type: UUIDType },
    name: { type: GraphQLString },
    balance: { type: GraphQLFloat },
    profile: {
      type: ProfileType,
      resolve: async ({ id } ) => await prisma.profile.findUnique({ where: { userId: id } }),
    },      
    posts: {
      type: PostsType,
      resolve: async ({ id } ) => await prisma.post.findMany({ where: { authorId: id } }),
    },
    userSubscribedTo: { type: UsersType },
    subscribedToUser: { type: UsersType },
  }),
});

export const UsersType = new GraphQLList(UserType);
