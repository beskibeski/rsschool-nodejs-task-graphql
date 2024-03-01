import { GraphQLObjectType } from 'graphql';
import { MembersType } from './types/member.js';
import { PostsType } from './types/post.js';
import { UsersType } from './types/user.js';
import { ProfilesType } from './types/profile.js';
import { PrismaClient } from '@prisma/client';

const rootQuery = new GraphQLObjectType ({
  name: 'query',
  fields: {
    memberTypes: {
      type: MembersType,
      resolve: async (_: unknown, __: unknown, prisma: PrismaClient) => await prisma.memberType.findMany(),
    },
    posts: {
      type: PostsType,
      resolve: async (_: unknown, __: unknown, prisma: PrismaClient) => await prisma.post.findMany(),
    },
    users: {
      type: UsersType,
      resolve: async (_: unknown, __: unknown, prisma: PrismaClient) => await prisma.user.findMany(),
    },
    profiles: {
      type: ProfilesType,
      resolve: async (_: unknown, __: unknown, prisma: PrismaClient) => await prisma.profile.findMany(),
    },
  },  
});

export default rootQuery;