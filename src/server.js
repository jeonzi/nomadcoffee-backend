require("dotenv").config();
import express from "express";
import logger from "morgan";
import cors from "cors";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { typeDefs, resolvers } from "./schema";
import { getUser, protectedResolver } from "./users/users.utils";
import { graphqlUploadExpress } from "graphql-upload";

const PORT = process.env.DEV_PORT;

const startServer = async (typeDefs, resolvers) => {
	const apollo = new ApolloServer({
		typeDefs,
		resolvers,
		context: async ({ req }) => {
			return {
				loggedInUser: await getUser(req.headers.token),
				protectedResolver,
			};
		},
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});

	await apollo.start();
	const app = express();
	app.use(logger("tiny"));
	app.use("/static", express.static("uploads"));
	app.use(cors());
	app.use(graphqlUploadExpress());
	apollo.applyMiddleware({ app });
	await new Promise((func) => app.listen({ port: PORT }, func));
	console.log(
		`ApolloServer is running on http://localhose:${PORT}${apollo.graphqlPath}`
	);
};

startServer(typeDefs, resolvers);
