export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/',
		'/profile',
		'/deliver-employee',
		'/customers',
		'/deliver-info',

		'/employee',

		'/example/:path*',
	],
};
