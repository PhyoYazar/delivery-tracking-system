import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import ApiClient from '~/server/apiClient';
import type { ParcelResponse } from '~/types/parcel-api';

export const parcelRouter = createTRPCRouter({
	createParcel: publicProcedure
		.input(
			z.object({
				price: z.number(),
				sender_id: z.string(),
				receiver_id: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			await ApiClient(ctx.session).post<ParcelResponse>('/parcels', input);
		}),

	getAllParcels: publicProcedure.query(async ({ ctx }) => {
		const [response, error] = await ApiClient(ctx.session)
			.get<ParcelResponse[]>('/parcels')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),
});
