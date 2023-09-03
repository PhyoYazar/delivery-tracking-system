import { Box, NavLink, Stack, useMantineTheme } from '@mantine/core';
import { IconUserSearch, IconUsers } from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const adminNavigationItems = [
	{ href: '/', label: 'Parcels', icon: IconUserSearch },
	{ href: '/customers', label: 'Customers', icon: IconUsers },
	{ href: '/deliver-info', label: 'Delivery Info', icon: IconUsers },
];

export const NavSidebar = () => {
	const { pathname } = useRouter();
	const theme = useMantineTheme();

	return (
		<Stack spacing={6}>
			{adminNavigationItems.map(({ href, label, icon }) => (
				<NavLink
					key={href}
					component={Link}
					href={href}
					label={label}
					active={pathname === href}
					icon={
						<Box component={icon} size='1.5rem' color={theme.colors.gray[8]} />
					}
				/>
			))}
		</Stack>
	);
};
