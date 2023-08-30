import {
	Badge,
	Box,
	Flex,
	Group,
	Menu,
	Text,
	Title,
	useMantineTheme,
} from '@mantine/core';
import { IconLogout, IconUserCircle } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';

export const NavHeader = () => {
	const router = useRouter();
	const theme = useMantineTheme();
	const { data } = useSession();

	return (
		<Flex h='100%' align='center' justify={'space-between'}>
			<Box>
				<Title order={3} color='gray.8'>
					Delivery Service System
				</Title>
			</Box>

			<Group spacing={10}>
				<Badge>{data?.user.role}</Badge>

				<Menu shadow='md' width={260} position='bottom-end'>
					<Menu.Target>
						<Group spacing={10} sx={{ cursor: 'pointer' }}>
							<IconUserCircle size={28} color={theme.colors.gray[6]} />
							<Text fw={500} fz={'sm'} c='gray.6'>
								{data?.user.name}
							</Text>
						</Group>
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
							onClick={() => void signOut()}
						>
							Logout
						</Menu.Item>
					</Menu.Dropdown>
				</Menu>
			</Group>
		</Flex>
	);
};
