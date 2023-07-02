import {
	Box,
	Button,
	Center,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
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
			<Stack spacing={20}>
				<Title order={3}>Search Your Products</Title>

				{/* <TextInput placeholder='Your email' label='Email' /> */}
				{/* <PasswordInput placeholder='Password' label='Password' /> */}

				<Stack>
					<TextInput placeholder='username' label='Username' withAsterisk />
					<TextInput
						placeholder='09783432122'
						label='Phone Number'
						withAsterisk
					/>
				</Stack>

				<Button color='orange' onClick={() => void router.push('/')}>
					Search
				</Button>

				<Center>
					<Text fz='xs' fw={700} color='gray.6'>
						Login as Admin
					</Text>
				</Center>
			</Stack>
		</Box>
	);
};
