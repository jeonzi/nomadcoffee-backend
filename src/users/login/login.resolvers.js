import client from "../../client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export default {
	Mutation: {
		login: async (_, { username, password }) => {
			const user = await client.user.findFirst({
				where: { username },
			});

			if (!user) {
				return {
					ok: false,
					error: "user doesn't exist. check your username!",
				};
			}

			const checkingPWD = await bcrypt.compare(password, user.password);
			if (!checkingPWD) {
				return {
					ok: false,
					error: "Check your password!",
				};
			}

			const token = await jwt.sign({ id: user.id }, process.env.SECRET_KEY);
			return {
				ok: true,
				token,
			};
		},
	},
};
