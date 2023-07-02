import { Box, Center, Stack, Title } from '@mantine/core';
import { GoBackButton } from '~/feature/common/GoBackButton';

const ProfilePage = () => {
	return (
		<Box p={20}>
			<GoBackButton />

			<Stack>
				<Center h='100%'>
					<Title>Profile Page</Title>
				</Center>
			</Stack>
		</Box>
	);
};

export default ProfilePage;
