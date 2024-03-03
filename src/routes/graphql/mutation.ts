import { GraphQLBoolean, GraphQLObjectType } from "graphql";
import { ChangePostInputType, CreatePostInputType, PostType } from "./types/post.js";
import { ChangeUserInputType, CreateUserInputType, UserType } from "./types/user.js";
import { ChangeProfileInputType, CreateProfileInputType, ProfileType } from "./types/profile.js";
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
    changePost: {
      type: PostType,
      args: { id: { type: UUIDType }, dto: { type: ChangePostInputType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.post.update({ where: { id: args.id}, data: args.dto }),
    },    
    changeUser: {
      type: UserType,
      args: { id: { type: UUIDType }, dto: { type: ChangeUserInputType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.user.update({ where: { id: args.id}, data: args.dto }),
    },
    changeProfile: {
      type: ProfileType,
      args: { id: { type: UUIDType }, dto: { type: ChangeProfileInputType } },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.profile.update({ where: { id: args.id}, data: args.dto }),
    },
    subscribeTo: {
      type: UserType,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType} },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.subscribersOnAuthors
        .create({ data: { subscriberId: args.userId, authorId: args.authorId } })
        .then(() => prisma.user.findUnique( { where: { id: args.userId }})),
    },
    unsubscribeFrom: {
      type: GraphQLBoolean,
      args: { userId: { type: UUIDType }, authorId: { type: UUIDType} },
      resolve: async(_: unknown, args: Record<string, any>) => await prisma.subscribersOnAuthors
        .deleteMany({ where: { subscriberId: args.userId, authorId: args.authorId } })
        .then(() => true)
        .catch(() => false),
    },        
  })
});
  
export default rootMutation;