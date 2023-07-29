import { exampleRouter } from '~/server/api/routers/example';
import { createTRPCRouter } from '~/server/api/trpc';
import { authRouter } from './routers/auth';
import { customerRouter } from './routers/customer';
import { deliverRouter } from './routers/deliver';
import { locationRouter } from './routers/location';
import { parcelRouter } from './routers/parcel';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	example: exampleRouter,
	parcel: parcelRouter,
	auth: authRouter,
	location: locationRouter,
	deliver: deliverRouter,
	customer: customerRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
