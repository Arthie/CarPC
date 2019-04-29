import gql from "graphql-tag"
import * as ReactApolloHooks from "react-apollo-hooks"

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
export type CarEventSubscriptionVariables = {}

export type CarEventSubscription = { __typename?: "Subscription" } & {
  carEvent: { __typename?: "Car" } & Pick<Car, "speed" | "rpm">
}

export type FolderQueryVariables = {
  path: Scalars["String"]
}

export type FolderQuery = { __typename?: "Query" } & {
  folder: { __typename?: "Folder" } & {
    directories: Array<
      { __typename?: "DirectoryItem" } & Pick<DirectoryItem, "path">
    >
    music: Array<
      { __typename?: "MusicItem" } & Pick<MusicItem, "path" | "ext"> & {
          metadata: { __typename?: "Metadata" } & Pick<
            Metadata,
            "artist" | "album" | "title" | "picture" | "duration"
          >
        }
    >
  }
}

export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>

export const CarEventDocument = gql`
  subscription CarEvent {
    carEvent {
      speed
      rpm
    }
  }
`

export function useCarEventSubscription(
  baseOptions?: ReactApolloHooks.SubscriptionHookOptions<
    CarEventSubscription,
    CarEventSubscriptionVariables
  >
) {
  return ReactApolloHooks.useSubscription<
    CarEventSubscription,
    CarEventSubscriptionVariables
  >(CarEventDocument, baseOptions)
}
export const FolderDocument = gql`
  query Folder($path: String!) {
    folder(path: $path) {
      directories {
        path
      }
      music {
        path
        ext
        metadata {
          artist
          album
          title
          picture
          duration
        }
      }
    }
  }
`

export function useFolderQuery(
  baseOptions?: ReactApolloHooks.QueryHookOptions<FolderQueryVariables>
) {
  return ReactApolloHooks.useQuery<FolderQuery, FolderQueryVariables>(
    FolderDocument,
    baseOptions
  )
}
