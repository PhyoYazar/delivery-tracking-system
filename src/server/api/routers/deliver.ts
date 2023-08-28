import { TRPCClientError } from '@trpc/client';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import type { Deliver } from '~/types/user';

import { z } from 'zod';

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

	getDelivers: protectedProcedure
		.input(
			z.object({ township_id: z.string().nullable().optional() }).optional(),
		)
		.query(async ({ input, ctx }) => {
			const [response, error] = await ctx.api
				.get<Deliver[]>('/user', { params: input })
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				throw new TRPCClientError('Error occured');
			}

			return response.data;
		}),
});
