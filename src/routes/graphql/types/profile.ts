import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';
import { MemberType, MemberTypeIdEnum } from './member.js';
import { UserType } from './user.js';
import { prisma } from '../services/prismaClient.js';

export const ProfileType = new GraphQLObjectType({
  name: 'ProfileType',
  fields: () => ({
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    userId: { type: UUIDType },
    user: { type: UserType },
    memberTypeId: { type: MemberTypeIdEnum },
    memberType: {
      type: MemberType,
      resolve: async ({  memberTypeId } ) => await prisma.memberType.findUnique({ where: { id: memberTypeId } }),
    },
  }),
});

export const ProfilesType = new GraphQLList(ProfileType);
