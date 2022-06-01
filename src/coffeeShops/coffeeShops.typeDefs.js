import { gql } from "apollo-server-express";

export default gql`
	type CoffeeShop {
		id: Int!
		name: String!
		latitude: String!
		longtitude: String!
		user: User!
		photos: [CoffeeShopPotho]
		categories: [Category]
		createdAt: String!
		updatedAt: String!
	}

	type CoffeeShopPotho {
		id: Int!
		url: String
		shop: CoffeeShop!
		createdAt: String!
		updatedAt: String!
	}

	type Category {
		id: Int!
		name: String!
		slug: String!
		shops: [CoffeeShop]
		totalShops: Int!
		createdAt: String!
		updatedAt: String!
	}
`;
