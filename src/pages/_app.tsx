import { MantineProvider, createEmotionCache } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { type Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { type AppType } from 'next/app';
import { Inter } from 'next/font/google';
import { RouterTransition } from '~/feature/common/RouterTransition';
import '~/styles/globals.css';
import { api } from '~/utils/api';

const inter = Inter({
	subsets: ['latin'],
	weight: ['100', '300', '400', '500', '600', '700', '900'],
});

const myCache = createEmotionCache({
	key: 'mantine',
	prepend: false,
});

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps },
}) => {
	return (
		<>
			{/* <Head>
				<link rel='shortcut icon' href='/favicon.svg' />
			</Head> */}

			<MantineProvider
				withNormalizeCSS
				withCSSVariables
				emotionCache={myCache}
				theme={{ fontFamily: inter.style.fontFamily }}
			>
				<Notifications position='bottom-left' zIndex={100} />
				<RouterTransition />
				<ModalsProvider>
					<SessionProvider session={session}>
						<Component {...pageProps} />
					</SessionProvider>
				</ModalsProvider>
			</MantineProvider>
		</>
	);
};

export default api.withTRPC(MyApp);
