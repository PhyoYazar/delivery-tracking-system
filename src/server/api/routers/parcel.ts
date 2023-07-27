import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import type { ParcelResponse } from '~/types/parcel-api';

export const parcelRouter = createTRPCRouter({
	createParcel: protectedProcedure
		.input(
			z.object({
				price: z.number(),
				sender_id: z.string(),
				receiver_id: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			await ctx.api.post<ParcelResponse>('/parcels', input);
		}),

	getAllParcels: protectedProcedure
		.input(
			z
				.object({
					sender_township: z.string().nullable(),
					receiver_township: z.string().nullable(),
				})
				.optional(),
		)
		.query(async ({ input, ctx }) => {
			const [response, error] = await ctx.api
				.get<ParcelResponse[]>('/parcels', { params: input })
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				return 'Error';
			}

			return response.data;
		}),
});
