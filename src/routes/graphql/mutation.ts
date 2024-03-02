import { GraphQLBoolean, GraphQLInputObjectType, GraphQLObjectType } from "graphql";import { CreatePostInputType, PostType } from "./types/post.js";
import { CreateUserInputType, UserType } from "./types/user.js";
import { CreateProfileInputType, ProfileType } from "./types/profile.js";
import { prisma } from "./services/prismaClient.js";
import { UUIDType } from "./types/uuid.js";

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
    deletePost: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.post.delete({ where: { id: args.id } })
        .then(() => true)
        .catch(() => false),      
    },    
    deleteUser: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.user.delete({ where: { id: args.id } })
        .then(() => true)
        .catch(() => false),
    },
    deleteProfile: {
      type: GraphQLBoolean,
      args: { id: { type: UUIDType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.profile.delete({ where: { id: args.id } })
        .then(() => true)
        .catch(() => false),
    },
  })
});
  
export default rootMutation;