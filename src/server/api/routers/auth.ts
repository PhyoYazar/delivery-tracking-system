import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import ApiClient from '~/server/apiClient';
import type { ParcelResponse } from '~/types/parcel-api';

export const authRouter = createTRPCRouter({
	signUp: publicProcedure
		.input(
			z.object({
				price: z.number(),
				sender_id: z.string(),
				receiver_id: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const [response, error] = await ApiClient(ctx.session)
				.post<ParcelResponse>('/auth/sign-up', input)
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (error) {
				// console.log('sign up trpc error => ', error);
			}

			return response;
		}),

	login: publicProcedure.mutation(async ({ input, ctx }) => {
		const [response, error] = await ApiClient(ctx.session)
			.get<ParcelResponse[]>('/auth/sign-in', input)
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		// console.log(response);

		// console.log(response?.data, error);
		if (error) {
			// console.log('log in trpc error => ', error);
		}

		return response?.data;
	}),

	refresh: publicProcedure.mutation(async ({ input, ctx }) => {
		const [response, error] = await ApiClient(ctx.session)
			.get<ParcelResponse[]>('/auth/refresh-token', input)
			.then((res) => [res, null] as const)
			.catch((e: unknown) => [null, e] as const);

		// console.log(response);

		// console.log(response?.data, error);
		if (error) {
			// console.log('log in trpc error => ', error);
		}

		return response?.data;
	}),
});
