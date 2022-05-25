import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		createAccount: async (_, { username, email, name, password }) => {
			try {
				const exsitingUser = await client.user.findFirst({
					where: {
						OR: [{ username }, { email }],
					},
				});

				if (exsitingUser) {
					throw new error("This username or email is already taken.");
				}

				const hashedPW = await bcrypt.hash(password, 10);

				await client.user.create({
					data: {
						username,
						email,
						name,
						password: hashedPW,
					},
				});
				return {
					ok: true,
				};
			} catch (e) {
				return {
					ok: false,
					// error: "something happened in creating your account🥲.",
					error: e,
				};
			}
		},
	},
};
