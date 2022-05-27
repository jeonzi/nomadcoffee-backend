require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";

const PORT = process.env.DEV_PORT;

const server = new ApolloServer({
	schema,
	context: async ({ req }) => {
		return {
			loggedInUser: await getUser(req.headers.token),
			protectedResolver,
		};
	},
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
	.listen()
	.then(() => console.log(`Sever is running on http://localhost:${PORT}`));
