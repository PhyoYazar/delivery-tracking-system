import { type GetServerSidePropsContext } from 'next';
import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
	type User,
} from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { Form } from '~/types/login';
import ApiClient from './apiClient';
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next-auth' {
	type Role = 'deliver' | 'admin' | 'super_admin';

	interface Session extends DefaultSession {
		user: {
			id: string;
			accessToken: string;
			refreshToken: string;
			name: string;
			email: string;
			role: Role;
			// ...other properties
			// role: UserRole;
		} & DefaultSession['user'];
	}

	interface User {
		id: string;
		accessToken: string;
		refreshToken: string;
		name: string;
		email: string;
		role: Role;
		// ...other properties
		// role: UserRole;
	}
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				return {
					...token,
					id: user.id,
					name: user.name,
					email: user.email,
					role: user.role,
					accessToken: user.accessToken,
					refreshToken: user.refreshToken,
				};
			}

			return token;
		},

		session: ({ session, token }) => ({
			...session,
			user: {
				...session.user,
				id: token.id,
				name: token.name,
				email: token.email,
				role: token.role,
				accessToken: token.accessToken,
				refreshToken: token.refreshToken,
			},
		}),
	},
	providers: [
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */

		CredentialsProvider({
			// The name to display on the sign in form (e.g. 'Sign in with...')
			name: 'Credentials',
			// The credentials is used to generate a suitable form on the sign in page.
			// You can specify whatever fields you are expecting to be submitted.
			// e.g. domain, username, password, 2FA token, etc.
			// You can pass any HTML attribute to the <input> tag through the object.
			credentials: {
				email: { label: 'Email', type: 'text', placeholder: 'user@email.com' },
				password: { label: 'Password', type: 'password' },
			},
			authorize: async (credentials) => {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				// const r = await api

				const { email, password } = credentials as Form;

				if (!email || !password) {
					return null; // Return null if credentials are missing
				}

				const response = await ApiClient().post('/auth/sign-in', {
					email,
					password,
				});

				// If no error and we have user data, return it
				if (response.data) {
					return response.data as User;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
	],

	session: {
		strategy: 'jwt',
	},

	pages: {
		signIn: '/login',
	},
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext['req'];
	res: GetServerSidePropsContext['res'];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
