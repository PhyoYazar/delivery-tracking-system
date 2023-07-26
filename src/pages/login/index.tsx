import { Box, Center } from '@mantine/core';
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
