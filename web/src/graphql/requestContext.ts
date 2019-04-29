import { DataProxy } from "apollo-cache"

export interface RequestContext {
  cache: DataProxy
  getCacheKey: (options: { __typename: string; id: string }) => string
}
