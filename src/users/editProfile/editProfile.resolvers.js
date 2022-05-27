import { protectedResolver } from "../users.utils";
import bcrypt from "bcrypt";
import client from "../../client";

export default {
	Mutation: {
		editProfile: protectedResolver(
			async (
				_,
				{
					username,
					email,
					name,
					githubUsername,
					avatarURL,
					password: newPassword,
				},
				{ loggedInUser }
			) => {
				let hashedPW = null;
				if (newPassword) {
					hashedPW = await bcrypt.hash(newPassword, 10);
				}

				const updateUser = await client.user.update({
					where: { id: loggedInUser.id },
					data: {
						username,
						email,
						name,
						githubUsername,
						avatarURL,
						...(hashedPW && { password: hashedPW }),
					},
				});

				if (updateUser) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "Couldn't update your profile",
					};
				}
			}
		),
	},
};
