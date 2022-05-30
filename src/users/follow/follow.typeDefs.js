import { gql } from "apollo-server-express";

export default gql`
	type followResult {
		ok: Boolean!
		error: String
	}

	type Mutation {
		follow(username: String!): followResult!
	}
`;
