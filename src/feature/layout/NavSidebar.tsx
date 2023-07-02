import { Box, NavLink, Stack, useMantineTheme } from '@mantine/core';
import {
	IconTruckDelivery,
	IconTruckOff,
	IconUserSearch,
	IconUsers,
} from '@tabler/icons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const navigationItems = [
	{
		href: '/admin/active-trucks',
		label: 'Active Delivery Trucks',
		icon: IconTruckDelivery,
	},
	{
		href: '/admin/finish-trucks',
		label: 'Finish Delivery Trucks',
		icon: IconTruckOff,
	},
	{ href: '/admin/deli-employee', label: 'Delivery Men', icon: IconUserSearch },
	{ href: '/admin/customers', label: 'Customers', icon: IconUsers },
];

export const NavSidebar = () => {
	const { pathname } = useRouter();
	const theme = useMantineTheme();

	return (
		<Stack spacing={4}>
			{navigationItems.map(({ href, label, icon }) => (
				<NavLink
					key={href}
					component={Link}
					href={href}
					label={label}
					active={pathname.startsWith(href)}
					icon={
						<Box component={icon} size='1.5rem' color={theme.colors.gray[8]} />
					}
				/>
			))}
		</Stack>
	);
};
