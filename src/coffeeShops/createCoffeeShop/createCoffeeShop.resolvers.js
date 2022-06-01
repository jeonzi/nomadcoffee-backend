import { GraphQLUpload } from "graphql-upload";
import { protectedResolver } from "../../users/users.utils";
import { uploadToS3 } from "../../shared/shared.utils";
import client from "../../client";

export default {
	Upload: GraphQLUpload,
	Mutation: {
		createCoffeeShop: protectedResolver(
			async (
				_,
				{ name, latitude, longtitude, photo, category },
				{ loggedInUser }
			) => {
				// 카테고리 생성
				let cateArr = [];
				const categories = category.match(/#[\w]+/g);
				cateArr = categories.map((category) => ({
					where: { name: category },
					create: {
						name: category,
						slug: category,
					},
				}));

				// 카페 사진 업로드
				let photoUrls = [];
				let photoArr = [];
				for (let i = 0; i < photo.length; i++) {
					const url = await uploadToS3(
						photo[i],
						loggedInUser.id,
						"photos"
					);
					photoUrls.push(url);
				}
				photoArr = photoUrls.map((photo) => ({
					where: { url: photo },
					create: {
						url: photo,
					},
				}));

				const createdShop = await client.coffeeShop.create({
					data: {
						name,
						latitude,
						longtitude,
						user: {
							connect: {
								id: loggedInUser.id,
							},
						},
						photos: {
							connectOrCreate: photoArr,
						},
						categories: {
							connectOrCreate: cateArr,
						},
					},
				});

				if (createdShop.id) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "cannot create",
					};
				}
			}
		),
	},
};
