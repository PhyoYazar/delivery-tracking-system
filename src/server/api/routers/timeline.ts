import { z } from 'zod';
import { createTRPCRouter, protectedProcedure } from '../trpc';

interface Timeline {
	id: string;
	created_at: string;
	updated_at: string;
	type:
		| 'booking'
		| 'start_pick_up'
		| 'arrive_warehouse'
		| 'start_deliver'
		| 'finish';
	parcel_id: string;
}

// export const timelineEnum = z.enum([
// 	'booking',
// 	'start_pick_up',
// 	'arrive_warehouse',
// 	'start_deliver',
// 	'finish',
// ]);

export const timelineRouter = createTRPCRouter({
	createParcel: protectedProcedure
		.input(
			z.object({
				type: z.string(),
				parcel_id: z.string(),
			}),
		)
		.mutation(async ({ input, ctx }) => {
			await ctx.api.post<Timeline>('/timeline', input);
		}),
});
