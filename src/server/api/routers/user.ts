import { TRPCError } from '@trpc/server';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '~/server/api/trpc';
import type { ErrorResponse } from '~/types';
import type { Deliver } from '~/types/user';

export const userRouter = createTRPCRouter({
	getUserById: protectedProcedure
		.input(
			z.object({
				id: z.string(),
			}),
		)
		.query(async ({ input, ctx }) => {
			const { id } = input;

			const [response, error] = await ctx.api
				.get<Deliver>(`/user/${id}`)
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				return null;
			}

			return response.data;
		}),

	updateUserById: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().optional(),
				email: z.string().optional(),
				phone_number: z.string().optional(),
				address: z.string().optional(),
				township_id: z.string().optional(),
				city_id: z.string().optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { id, ...updateFields } = input;

			const [response, error] = await ctx.api
				.patch<Deliver>(`/user/${id}`, updateFields)
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (error instanceof AxiosError) {
				const errorResponse = error.response as ErrorResponse;
				throw new TRPCError({
					code: 'BAD_REQUEST',
					message: JSON.stringify(errorResponse.data.message),
				});
			}

			return response?.data;
		}),
});
