import { GraphQLBoolean, GraphQLInputObjectType, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
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

export const CreateProfileInputType = new GraphQLInputObjectType({
  name: 'CreateProfileInput',
  fields: () => ({
    isMale: { type: new GraphQLNonNull(GraphQLBoolean) },
    yearOfBirth: { type: new GraphQLNonNull(GraphQLInt) },
    memberTypeId: { type: new GraphQLNonNull(MemberTypeIdEnum) },
    userId: { type: new GraphQLNonNull(UUIDType) },
  }),
});

export const ChangeProfileInputType = new GraphQLInputObjectType({
  name: 'ChangeProfileInput',
  fields: () => ({
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    memberTypeId: { type: MemberTypeIdEnum },
  }),
});