import { GraphQLBoolean, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';
import { UUIDType } from './uuid.js';

export const ProfileType = new GraphQLObjectType({
  name: 'profileType',
  fields: {
    id: { type: UUIDType },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
  },
});

export const ProfilesType = new GraphQLList(ProfileType);
