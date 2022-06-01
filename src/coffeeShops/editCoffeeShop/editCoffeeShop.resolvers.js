import client from "../../client";
import { protectedResolver } from "../../users/users.utils";
import { GraphQLUpload } from "graphql-upload";
import { uploadToS3, delPhotoS3 } from "../../shared/shared.utils";

export default {
	Upload: GraphQLUpload,

	Mutation: {
		editCoffeeShop: protectedResolver(
			async (
				_,
				{ id, name, latitude, longitude, photo, category },
				{ loggedInUser }
			) => {
				const oldCoffeeShop = await client.coffeeShop.findFirst({
					where: {
						id,
					},
					include: {
						categories: {
							select: {
								name: true,
							},
						},
					},
				});
				if (!oldCoffeeShop) {
					return {
						ok: false,
						error: "Coffeeshop not found.",
					};
				}

				// 카테고리
				let cateArr = [];
				if (category) {
					const categories = category.match(/#[\w]+/g);
					cateArr = categories.map((category) => ({
						where: { name: category },
						create: {
							name: category,
							slug: category,
						},
					}));
				}

				// 카페 사진 업로드
				let photoUrls = [];
				let photoArr = [];
				if (photo) {
					for (let index = 0; index < photo.length; index++) {
						const url = await uploadToS3(
							photo[index],
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
				}

				const updatedCoffeeShop = await client.coffeeShop.update({
					where: { id },
					data: {
						name,
						latitude,
						longitude,
						photos: {
							connectOrCreate: photoArr,
						},
						categories: {
							disconnect: oldCoffeeShop.categories,
							connectOrCreate: cateArr,
						},
					},
				});

				if (updatedCoffeeShop.id) {
					return {
						ok: true,
					};
				} else {
					return {
						ok: false,
						error: "cannot update.",
					};
				}
			}
		),
	},
};
