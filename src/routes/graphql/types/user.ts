import { GraphQLFloat, GraphQLInputObjectType, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { UUIDType } from './uuid.js';
import { ProfileType } from './profile.js';
import { PostsType } from './post.js';
import { prisma } from '../services/prismaClient.js';

export const UserType = new GraphQLObjectType({
  name: 'UserType',
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
    userSubscribedTo: {
      type: UsersType,
      resolve: async ({ id } ) => {
        const usersSubscribedTo =
          await prisma.subscribersOnAuthors.findMany({
            where: { subscriberId: id },
            select: { author: true }
          });
        return usersSubscribedTo.map((userSubscibedTo) => userSubscibedTo.author);
      }
    },
    subscribedToUser: {
      type: UsersType,
      resolve: async ({ id } ) => {
        const usersSubscribedTo =
          await prisma.subscribersOnAuthors.findMany({
            where: { authorId: id },
            select: { subscriber: true }
          });
        return usersSubscribedTo.map((userSubscibedTo) => userSubscibedTo.subscriber);
      }
     },
  }),
});

export const UsersType = new GraphQLList(UserType);

export const CreateUserInputType = new GraphQLInputObjectType({
  name: 'CreateUserInput',
  fields: () => ({
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
  }),
});
