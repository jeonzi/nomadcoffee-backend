import jwt from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
	try {
		if (!token) {
			return null;
		}
		const { id } = await jwt.verify(token, process.env.SECRET_KEY);
		const user = await client.user.findUnique({ where: { id } });
		if (user) {
			return user;
		} else {
			return null;
		}
	} catch {
		return null;
	}
};

// login한 user만 resolver 호출할 수 있음 ==> 쓸데없이 모든 resolver 실행할 필요 없어져서 Good ==> resolver를 protect하는 것
export const protectedResolver =
	(ourResolver) => (root, args, context, info) => {
		if (!context.loggedInUser) {
			return {
				ok: false,
				error: "PLZ login to perform this action",
			};
		}

		return ourResolver(root, args, context, info);
	};
