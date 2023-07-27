import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import ApiClient from '~/server/apiClient';
import type { City, Township } from '~/types';

export const locationRouter = createTRPCRouter({
	getCity: protectedProcedure.query(async ({ ctx }) => {
		const [response, error] = await ApiClient(ctx.session)
			.get<City[]>('/city')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),

	getTownship: protectedProcedure.query(async ({ ctx }) => {
		const [response, error] = await ApiClient(ctx.session)
			.get<Township[]>('/township')
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		if (response === null || error) {
			return 'Error';
		}

		return response.data;
	}),
});
