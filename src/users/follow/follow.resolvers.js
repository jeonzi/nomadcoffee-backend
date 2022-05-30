import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
	Mutation: {
		follow: protectedResolver(async (_, { username }, { loggedInUser }) => {
			const toFollow = await client.user.findUnique({
				where: { username },
			});

			if (!toFollow) {
				return {
					ok: false,
					error: "User does not exsit",
				};
			}

			await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					following: {
						connect: {
							username,
						},
					},
				},
			});

			return {
				ok: true,
			};
		}),
	},
};
