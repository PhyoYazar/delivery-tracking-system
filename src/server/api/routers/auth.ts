import { TRPCError } from '@trpc/server';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';
import ApiClient from '~/server/apiClient';
import type { Deliver, ErrorResponse } from '~/types';
import type { ParcelResponse } from '~/types/parcel-api';

export const authRouter = createTRPCRouter({
	signUp: publicProcedure
		.input(
			z.object({
				name: z.string(),
				email: z.string().email(),
				phone_number: z.string(),
				password: z.string().min(6),
				address: z.string(),
				township_id: z.string().nullable(),
				city_id: z.string().nullable(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const [response, error] = await ApiClient(ctx.session)
				.post<Deliver>('/auth/sign-up', input)
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			// if (error) {
			// 	console.log('sign up trpc error => ', error);
			// }
			if (error instanceof AxiosError) {
				const errorResponse = error.response as ErrorResponse;
				throw new TRPCError({
					code: 'CONFLICT',
					message: JSON.stringify(errorResponse.data.message),
				});
			}

			return response?.data;
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
