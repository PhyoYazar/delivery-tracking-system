import { Box, Center, ScrollArea, Stack, Title } from '@mantine/core';
import Head from 'next/head';
import { InfoCard } from '~/feature/user/InfoCard';

export default function Home() {
	// const hello = api.example.hello.useQuery({ text: 'from tRPC' });

	return (
		<>
			<Head>
				<title>Home</title>
				<meta name='description' content='Delivery Tracking System' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Box w='100vw' h='100vh'>
				<Center h='100%'>
					<Stack>
						<Title>This is Home page</Title>

						<ScrollArea h={'50vh'} type='hover' offsetScrollbars>
							<Stack>
								{[1, 2, 3, 4, 5, 6].map((el) => (
									<InfoCard key={el} />
								))}
							</Stack>
						</ScrollArea>
					</Stack>
				</Center>
			</Box>
		</>
	);
}
