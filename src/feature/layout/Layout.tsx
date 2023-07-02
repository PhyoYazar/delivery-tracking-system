import { AppShell, Box, Header, Navbar } from '@mantine/core';
import React from 'react';
import { NavHeader } from './NavHeader';
import { NavSidebar } from './NavSidebar';

export const headerLayoutHeight = 60;
export const navbarLayoutWidth = 300;

export const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<AppShell
			// layout='alt'
			padding='md'
			navbar={
				<Navbar width={{ base: navbarLayoutWidth }} p='sm'>
					<NavSidebar />
				</Navbar>
			}
			header={
				<Header height={headerLayoutHeight} px={28}>
					<NavHeader />
				</Header>
			}
			styles={(theme) => ({
				main: {
					backgroundColor:
						theme.colorScheme === 'dark'
							? theme.colors.dark[8]
							: theme.colors.gray[0],
				},
			})}
		>
			{/* Your application here */}
			<Box w='100%' h='100%'>
				{children}
			</Box>
		</AppShell>
	);
};
