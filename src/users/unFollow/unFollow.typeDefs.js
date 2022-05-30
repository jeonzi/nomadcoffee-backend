import { gql } from "apollo-server-express";

export default gql`
	type unFollowResult {
		ok: Boolean!
		error: String
	}

	type Mutation {
		unFollow(username: String!): unFollowResult!
	}
`;
