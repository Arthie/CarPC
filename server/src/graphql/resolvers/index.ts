import { PubSub } from "apollo-server-express"
import { IResolvers } from "#graphql/generated/resolvers"
import { checkFolder } from "#utils/checkFolder"
import Settings from "../../constants"

const { MUSICFOLDER } = Settings[process.argv[2]]
export const pubsub = new PubSub()
export const CAR_EVENT = "CAR_EVENT"

const resolvers: IResolvers = {
  Subscription: {
    carEvent: {
      // Additional event labels can be passed to asyncIterator creation
      subscribe: () => pubsub.asyncIterator([CAR_EVENT])
    }
  },
  Query: {
    folder: async (obj, args, context, info) => {
      try {
        console.log("folder query:", { obj, args, context, info })
        const test = await checkFolder(MUSICFOLDER, args.path)
        console.dir(test, { depth: null })
        if (test) return test
        return []
      } catch (e) {
        console.log(e, "sdafdsasdfasdfq")
      }
    }
  }
  // Mutation: {}
}

export default resolvers
