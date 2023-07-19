import { ActionIcon, Box, Flex, Menu, Title } from '@mantine/core';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export const NavHeader = () => {
	const router = useRouter();

	return (
		<Flex h='100%' align='center' justify={'space-between'}>
			<Box>
				<Title order={3} color='gray.8'>
					Delivery Tracking System
				</Title>
			</Box>

			<Menu shadow='md' width={260} position='bottom-end'>
				<Menu.Target>
					<ActionIcon>
						<IconUserCircle size={40} />
					</ActionIcon>
				</Menu.Target>

				<Menu.Dropdown>
					<Menu.Divider />

					<Menu.Label>Account Settings</Menu.Label>
					<Menu.Item
						color='gray.9'
						icon={<IconUserCircle size={20} />}
						onClick={() => void router.push('/profile')}
					>
						Profile
					</Menu.Item>
					<Menu.Item
						color='red'
						icon={<IconLogout size={20} />}
						onClick={() =>
							void router.replace('/login', undefined, {
								shallow: true,
							})
						}
					>
						Logout
					</Menu.Item>
				</Menu.Dropdown>
			</Menu>
		</Flex>
	);
};
