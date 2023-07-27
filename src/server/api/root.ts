import { exampleRouter } from '~/server/api/routers/example';
import { createTRPCRouter } from '~/server/api/trpc';
import { authRouter } from './routers/auth';
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
});

// export type definition of API
export type AppRouter = typeof appRouter;
