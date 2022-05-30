import client from "../client";

export default {
	User: {
		following: ({ id }, { lastId }) =>
			client.user.findUnique({ where: { id } }).following({
				take: 5,
				skip: lastId ? 1 : 0,
				...(lastId && { cursor: { id: lastId } }),
				select: { id: true, username: true },
			}),

		followers: ({ id }, { lastId }) =>
			client.user.findUnique({ where: { id } }).followers({
				take: 5,
				skip: lastId ? 1 : 0,
				...(lastId && { cursor: { id: lastId } }),
				select: { id: true, username: true },
			}),
		totalFollowing: ({ id }) => {
			client.user.count({
				where: {
					followers: {
						some: {
							id,
						},
					},
				},
			});
		},

		totalFollowers: ({ id }) => {
			client.user.count({
				where: {
					following: {
						some: {
							id,
						},
					},
				},
			});
		},

		isMe: ({ id }, _, { loggedInUser }) => {
			if (!loggedInUser) {
				return false;
			}
			return id === loggedInUser.id;
		},

		isFollowing: async ({ id }, _, { loggedInUser }) => {
			if (!loggedInUser) {
				return false;
			}
			const exsits = await client.user.count({
				where: {
					username: loggedInUser.username,
					following: {
						some: {
							id,
						},
					},
				},
			});
			return Boolean(exsits);
		},
	},
};
