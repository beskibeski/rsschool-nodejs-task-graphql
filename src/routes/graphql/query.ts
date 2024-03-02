import { GraphQLObjectType } from 'graphql';
import { MemberType, MemberTypeIdEnum, MembersType } from './types/member.js';
import { PostType, PostsType } from './types/post.js';
import { UserType, UsersType } from './types/user.js';
import { ProfileType, ProfilesType } from './types/profile.js';
import { PrismaClient } from '@prisma/client';
import { UUIDType } from './types/uuid.js';

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
    memberType: {
      type: MemberType,
      args: { id: { type: MemberTypeIdEnum } },
      resolve: async(_: unknown, args: Record<string, any>, prisma: PrismaClient) => await prisma.memberType.findUnique({ where: { id: args.id } }),
    },
    user: {
      type: UserType,
      args: { id: { type: UUIDType } },
      resolve: async(_: unknown, args: Record<string, any>, prisma: PrismaClient) => await prisma.user.findUnique({ where: { id: args.id }}),
    },
    post: {
      type: PostType,
      args: { id: { type: UUIDType } },
      resolve: async(_: unknown, args: Record<string, any>, prisma: PrismaClient) => await prisma.post.findUnique({ where: { id: args.id }}),
    },
    profile: {
      type: ProfileType,
      args: { id: { type: UUIDType } },
      resolve: async(_: unknown, args: Record<string, any>, prisma: PrismaClient) => await prisma.profile.findUnique({ where: { id: args.id }}),
    },       
  },
});

export default rootQuery;