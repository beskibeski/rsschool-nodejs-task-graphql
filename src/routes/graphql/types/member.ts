import { GraphQLEnumType, GraphQLFloat, GraphQLInt, GraphQLList, GraphQLObjectType } from 'graphql';

export const MemberTypeIdEnum = new GraphQLEnumType({
  name: 'memberTypeId',
  values: {
    BASIC: {
      value: 'basic'
    },
    BUSINESS: {
      value: 'business'
    },
  },
});

export const MemberType = new GraphQLObjectType({
  name: 'memberType',
  fields: {
    id: { type: MemberTypeIdEnum },
    discount: { type: GraphQLFloat },
    postsLimitPerMonth: { type: GraphQLInt },
  },
});

export const MembersType = new GraphQLList(MemberType);
