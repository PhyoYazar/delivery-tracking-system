import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/router';
import { RouterTransition } from '~/feature/common/RouterTransition';
import { Layout } from '~/feature/layout/Layout';
import { api } from '~/utils/api';

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '600', '700', '900'],
});

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	const router = useRouter();

	const layoutIgnoreRoutes = ['/profile', '/login', '/404', '/500'];
	const shouldHideLayout = layoutIgnoreRoutes.includes(router.pathname);

	return (
		<>
			{/* <Head>
				<link rel='shortcut icon' href='/favicon.svg' />
			</Head> */}

			<MantineProvider
				withNormalizeCSS
				withCSSVariables
				theme={{
					fontFamily: inter.style.fontFamily,

					other: {
						fontWeights: {
							normal: 400,
							medium: 500,
							bold: 700,
							extraBold: 900,
						},
					},

					components: {
						NavLink: {
							styles: (theme) => ({
								root: {
									padding: `${theme.spacing.sm}`,
									fontWeight: 500,
								},
								label: {
									color: theme.colors.gray[8],
									fontSize: theme.fontSizes.md,
								},
							}),
						},
						Tooltip: {
							defaultProps: {
								arrowSize: 8,
								withArrow: true,
							},
						},
						Popover: {
							defaultProps: {
								arrowSize: 8,
								withArrow: true,
							},
						},
						Menu: {
							defaultProps: {
								arrowSize: 8,
								withArrow: true,
							},
						},
					},
				}}
			>
				<Notifications position='bottom-right' zIndex={100} />
				<RouterTransition />
				<ModalsProvider>
					<SessionProvider session={session}>
						{shouldHideLayout ? (
							<Component {...pageProps} />
						) : (
							<Layout>
								<Component {...pageProps} />
							</Layout>
						)}
					</SessionProvider>
				</ModalsProvider>
			</MantineProvider>
		</>
	);
};

export default api.withTRPC(MyApp);
