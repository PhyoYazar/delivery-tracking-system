export { default } from 'next-auth/middleware';

export const config = {
	matcher: [
		'/',
		'/profile',
		'/deliver-employee',
		'/customers',
		'/example/:path*',
	],
};
