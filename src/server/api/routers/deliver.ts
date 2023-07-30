import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import type { Deliver } from '~/types/user';

export const deliverRouter = createTRPCRouter({
	// createDeliver: protectedProcedure
	// 	.input(
	// 		z.object({
	// 			price: z.number(),
	// 			sender_id: z.string(),
	// 			receiver_id: z.string(),
	// 		}),
	// 	)
	// 	.mutation(async ({ input, ctx }) => {
	// 		await ctx.api.post<ParcelResponse>('/parcels', input);
	// 	}),

	getDelivers: protectedProcedure.query(async ({ ctx }) => {
		const [response, error] = await ctx.api
			.get<Deliver[]>('/user')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),
});
