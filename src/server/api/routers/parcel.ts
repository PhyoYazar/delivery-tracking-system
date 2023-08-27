import { TRPCClientError } from '@trpc/client';
import { TRPCError } from '@trpc/server';
import { AxiosError } from 'axios';
import queryString from 'query-string';
import { z } from 'zod';
import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from '~/server/api/trpc';
import ApiClient from '~/server/apiClient';
import type { ErrorResponse } from '~/types';
import type { ApiResponse } from '~/types/api';
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

	getParcelsByUser: protectedProcedure
		.input(
			z
				.object({
					picked_up: z.boolean().optional(),
					arrived_warehouse: z.boolean().optional(),
					deliver: z.boolean().optional(),
					finish: z.boolean().optional(),
					address: z.string().optional(),
					sender_township: z.string().nullable().optional(),
					receiver_township: z.string().nullable().optional(),
					sender_address: z.string().nullable().optional(),
					receiver_address: z.string().nullable().optional(),
				})
				.optional(),
		)
		.query(async ({ input, ctx }) => {
			const [response, error] = await ctx.api
				.get<ParcelResponse[]>('/parcels/user', { params: input })
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				return 'Error';
			}

			return response.data;
		}),

	updateParcels: protectedProcedure
		.input(
			z.object({
				parcels: z.string().array(),
				user_id: z.string().nullable().optional(),
				picked_up: z.boolean().optional(),
				finish: z.boolean().optional(),
				arrived_warehouse: z.boolean().optional(),
				deliver: z.boolean().optional(),
				accept_picked_up: z.boolean().optional(),
				accept_deliver: z.boolean().optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const query = queryString.stringify(input, { arrayFormat: 'index' });

			const [response, error] = await ctx.api
				.patch<ApiResponse<ParcelResponse>>(`/parcels/updates?${query}`)
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

	updateParcel: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				picked_up: z.boolean().optional(),
				accept_picked_up: z.boolean().optional(),
				finish: z.boolean().optional(),
				arrived_warehouse: z.boolean().optional(),
				accept_deliver: z.boolean().optional(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			const { id, ...others } = input;

			const [response, error] = await ctx.api
				.patch<ParcelResponse[]>(`/parcels/${id}`, others)
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				return 'Error';
			}

			return response.data;
		}),

	autoAssign: publicProcedure
		.input(
			z.object({
				id: z.string(),
				role: z.string(),
			}),
		)
		.mutation(async ({ input }) => {
			const [response, error] = await ApiClient()
				.patch<ParcelResponse>(`/parcels/auto-assign/${input.id}`, {
					role: input.role,
				})
				.then((res) => [res, null] as const)
				.catch((e: unknown) => [null, e] as const);

			if (response === null || error) {
				throw new TRPCClientError('Something wrong!');
			}

			return response.data;
		}),
});
