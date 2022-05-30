import { gql } from "apollo-server-express";

export default gql`
	type User {
		id: Int!
		username: String!
		email: String!
		name: String!
		location: String
		avatarURL: String
		following(lastId: Int): [User]
		followers(lastId: Int): [User]
		githubUsername: String
		createdAt: String
		updatedAt: String
		totalFollowing: Int!
		totalFollowers: Int!
		isMe: Boolean!
		isFollowing: Boolean!
	}
`;
