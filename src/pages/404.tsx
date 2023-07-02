import { Box, Button, Center, Stack, Title } from '@mantine/core';
import { IconArrowBackUpDouble } from '@tabler/icons-react';
import Link from 'next/link';

const NotFoundPage = () => {
	return (
		<Box component='main' h='100vh' w='100vw'>
			<Center h='100%'>
				<Stack spacing={30}>
					<Title color='gray.7'>404 | Not Found!</Title>

					<Button
						component={Link}
						href='/'
						leftIcon={<IconArrowBackUpDouble size={24} />}
					>
						Go Home
					</Button>
				</Stack>
			</Center>
		</Box>
	);
};

export default NotFoundPage;
