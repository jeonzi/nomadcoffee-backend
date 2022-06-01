export default gql`
	scalar Upload

	type Mutation {
		createCoffeeShop(
			name: String!
			latitude: String!
			longtitude: String!
			photo: [Upload]!
			Category: String!
		): MutationResponse!
	}
`;
