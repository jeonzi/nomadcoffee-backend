import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
	Mutation: {
		unFollow: protectedResolver(async (_, { username }, { loggedInUser }) => {
			const exsitingUser = await client.user.findUnique({
				where: { username },
			});
			if (!exsitingUser) {
				return {
					ok: false,
					error: "Cannot unfollow user",
				};
			}

			await client.user.update({
				where: {
					id: loggedInUser.id,
				},
				data: {
					following: {
						disconnect: {
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
