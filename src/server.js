require("dotenv").config();
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import schema from "./schema";

const PORT = process.env.DEV_PORT;

const server = new ApolloServer({
	schema,
	plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

server
	.listen()
	.then(() => console.log(`Sever is running on http://localhost:${PORT}/`));
