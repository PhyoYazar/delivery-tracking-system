import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import type { Receiver, Sender } from '~/types';

export const customerRouter = createTRPCRouter({
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

	getSenders: protectedProcedure.query(async ({ ctx }) => {
		const [response, error] = await ctx.api
			.get<Sender[]>('/sender')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),

	getReceivers: protectedProcedure.query(async ({ ctx }) => {
		const [response, error] = await ctx.api
			.get<Receiver[]>('/receiver')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),
});
