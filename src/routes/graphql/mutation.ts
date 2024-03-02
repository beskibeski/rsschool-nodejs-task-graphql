import { GraphQLInputObjectType, GraphQLObjectType } from "graphql";import { CreatePostInputType, PostType } from "./types/post.js";
import { CreateUserInputType, UserType } from "./types/user.js";
import { CreateProfileInputType, ProfileType } from "./types/profile.js";
import { prisma } from "./services/prismaClient.js";

const rootMutation = new GraphQLObjectType ({
  name: 'Mutation',
  fields: () => ({
    createPost: {
      type: PostType,
      args: { dto: { type: CreatePostInputType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.post.create({ data: args.dto }),
    },    
    createUser: {
      type: UserType,
      args: { dto: { type: CreateUserInputType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.user.create({ data: args.dto }),
    },
    createProfile: {
      type: ProfileType,
      args: { dto: { type: CreateProfileInputType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.profile.create({ data: args.dto }),
    },
  })
});
  
export default rootMutation;