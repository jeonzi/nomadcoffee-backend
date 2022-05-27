import { gql } from "apollo-server-express";

export default gql`
	type EditProfileResult {
		ok: Boolean!
		error: String
	}

	type Mutation {
		editProfile(
			username: String
			name: String
			email: String
			githubUsername: String
			avatarURL: String
			password: String
		): EditProfileResult!
	}
`;
