import { gql } from "apollo-server-express";

export default gql`
	type CreateAccountResult {
		ok: Boolean!
		error: String
	}

	type Mutation {
		createAccount(
			username: String!
			name: String!
			email: String!
			password: String!
		): CreateAccountResult!
	}
`;
