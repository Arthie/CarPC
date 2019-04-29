export type Maybe<T> = T | null
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
}

export type Car = {
  speed?: Maybe<Scalars["Float"]>
  rpm?: Maybe<Scalars["Float"]>
}

export type DirectoryItem = {
  path: Scalars["String"]
}

export type FileItem = {
  path: Scalars["String"]
  ext: Scalars["String"]
}

export type Folder = {
  directories: Array<DirectoryItem>
  files: Array<FileItem>
  music: Array<MusicItem>
}

export type Metadata = {
  artist?: Maybe<Scalars["String"]>
  album?: Maybe<Scalars["String"]>
  title?: Maybe<Scalars["String"]>
  picture?: Maybe<Scalars["String"]>
  duration: Scalars["Float"]
}

export type MusicItem = {
  path: Scalars["String"]
  ext: Scalars["String"]
  metadata: Metadata
}

export type Query = {
  folder: Folder
}

export type QueryFolderArgs = {
  path: Scalars["String"]
}

export type Subscription = {
  carEvent: Car
}
import { RequestContext } from "../requestContext"

import { GraphQLResolveInfo } from "graphql"

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export type WithIndex<TObject> = TObject & Record<string, any>
export type ResolversObject<TObject> = WithIndex<TObject>

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: {}
  String: Scalars["String"]
  Folder: Folder
  DirectoryItem: DirectoryItem
  FileItem: FileItem
  MusicItem: MusicItem
  Metadata: Metadata
  Float: Scalars["Float"]
  Subscription: {}
  Car: Car
  Boolean: Scalars["Boolean"]
}>

export type CarResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["Car"]
> = ResolversObject<{
  speed?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>
  rpm?: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>
}>

export type DirectoryItemResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["DirectoryItem"]
> = ResolversObject<{
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type FileItemResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["FileItem"]
> = ResolversObject<{
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ext?: Resolver<ResolversTypes["String"], ParentType, ContextType>
}>

export type FolderResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["Folder"]
> = ResolversObject<{
  directories?: Resolver<
    Array<ResolversTypes["DirectoryItem"]>,
    ParentType,
    ContextType
  >
  files?: Resolver<Array<ResolversTypes["FileItem"]>, ParentType, ContextType>
  music?: Resolver<Array<ResolversTypes["MusicItem"]>, ParentType, ContextType>
}>

export type MetadataResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["Metadata"]
> = ResolversObject<{
  artist?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  album?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  title?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  picture?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>
  duration?: Resolver<ResolversTypes["Float"], ParentType, ContextType>
}>

export type MusicItemResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["MusicItem"]
> = ResolversObject<{
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  ext?: Resolver<ResolversTypes["String"], ParentType, ContextType>
  metadata?: Resolver<ResolversTypes["Metadata"], ParentType, ContextType>
}>

export type QueryResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["Query"]
> = ResolversObject<{
  folder?: Resolver<
    ResolversTypes["Folder"],
    ParentType,
    ContextType,
    QueryFolderArgs
  >
}>

export type SubscriptionResolvers<
  ContextType = RequestContext,
  ParentType = ResolversTypes["Subscription"]
> = ResolversObject<{
  carEvent?: SubscriptionResolver<
    ResolversTypes["Car"],
    ParentType,
    ContextType
  >
}>

export type Resolvers<ContextType = RequestContext> = ResolversObject<{
  Car?: CarResolvers<ContextType>
  DirectoryItem?: DirectoryItemResolvers<ContextType>
  FileItem?: FileItemResolvers<ContextType>
  Folder?: FolderResolvers<ContextType>
  Metadata?: MetadataResolvers<ContextType>
  MusicItem?: MusicItemResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Subscription?: SubscriptionResolvers<ContextType>
}>

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = RequestContext> = Resolvers<ContextType>
