import { Box, Button, Center, Stack, TextInput, Title } from '@mantine/core';
import { useRouter } from 'next/router';

export const Login = () => {
	const router = useRouter();

	return (
		<Box
			w={380}
			p={24}
			sx={(theme) => ({
				boxShadow: theme.shadows.md,
				borderRadius: theme.radius.md,
				border: `1px solid ${theme.colors.gray[3]}`,
			})}
		>
			<Stack spacing={30}>
				<Center>
					<Title order={2}>Login</Title>
				</Center>

				{/* <TextInput placeholder='Your email' label='Email' /> */}
				{/* <PasswordInput placeholder='Password' label='Password' /> */}

				<Stack>
					<TextInput placeholder='09783432122' label='Phone Number' />
					<TextInput placeholder='password' label='Password' />
				</Stack>

				<Button onClick={() => void router.push('/')}>Login</Button>
			</Stack>
		</Box>
	);
};
