import { Box, Flex, Group, Text, Title } from '@mantine/core';

export const NavHeader = () => {
	return (
		<Flex h='100%' align='center' justify={'space-between'}>
			<Box>
				<Title order={3} color='gray.8'>
					Deli Tracking System
				</Title>
			</Box>

			<Group spacing={24} noWrap>
				<Text>Create Deli</Text>
				<Text>Profile</Text>
				<Text>Logout</Text>
			</Group>
		</Flex>
	);
};
