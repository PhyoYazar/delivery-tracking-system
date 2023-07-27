import {
	Box,
	Button,
	Center,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { type GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import type { Form } from '~/types/login';

export const Login = () => {
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		// validate: {
		// 	email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
		// },
	});

	const onSubmit = async (data: Form) => {
		await signIn('credentials', {
			...data,
			redirect: true,
			callbackUrl: '/',
		});
	};

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

				<Box
					component='form'
					w='100%'
					onSubmit={form.onSubmit((values) => void onSubmit(values))}
				>
					<Stack>
						<TextInput
							placeholder='email'
							label='Email'
							withAsterisk
							{...form.getInputProps('email')}
						/>
						<PasswordInput
							placeholder='Password'
							label='Password'
							withAsterisk
							{...form.getInputProps('password')}
						/>

						<Button
							fullWidth
							type='submit'
							color='orange'
							//  onClick={() => void router.push('/')}
						>
							Login
						</Button>
					</Stack>
				</Box>

				<Center>
					<Text fz='xs' fw={700} color='gray.6'>
						Login as Admin
					</Text>
				</Center>
			</Stack>
		</Box>
	);
};

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	const session = await getSession({ req: _context.req });

	if (session) {
		return {
			redirect: {
				destination: '/',
				permanent: false,
			},
		};
	}
	return {
		props: {}, // will be passed to the page component as props
	};
}
