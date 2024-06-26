import { Box, Center } from '@mantine/core';
import type { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { Login } from '~/feature/auth/Login';

const LoginPage = () => {
	return (
		<Box component='main' w='100vw' h='100vh'>
			<Center h='100%'>
				<Login />
			</Center>
		</Box>
	);
};

export default LoginPage;

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	const session = await getSession({ req: _context.req });

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {}, // will be passed to the page component as props
	};
}
