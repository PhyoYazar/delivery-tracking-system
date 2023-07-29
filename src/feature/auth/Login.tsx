import {
	Box,
	Button,
	Center,
	Loader,
	PasswordInput,
	Stack,
	Text,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { type GetServerSidePropsContext } from 'next';
import { getSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import type { Form } from '~/types/login';

export const Login = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const router = useRouter();

	// form
	const form = useForm({
		initialValues: {
			email: '',
			password: '',
		},

		validate: {
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			password: (value) =>
				value.length >= 5
					? null
					: 'Password must be at least 6 characters long.',
		},
	});

	// submit form
	const onSubmit = async (data: Form) => {
		setIsError(false);
		setIsLoading(true);

		const result = await signIn('credentials', {
			...data,
			redirect: false,
			// redirect: true,
			// callbackUrl: '/',
		});

		if (result?.ok && !result?.error) {
			void router.push('/');
		} else {
			setIsError(true);
			setIsLoading(false);
		}
	};

	return (
		<Box
			w={340}
			p={24}
			sx={(theme) => ({
				boxShadow: theme.shadows.md,
				borderRadius: theme.radius.md,
				border: `1px solid ${theme.colors.gray[3]}`,
			})}
		>
			<Stack spacing={35} mb={20}>
				<Center>
					<Title order={2}>Login</Title>
				</Center>

				<Box
					component='form'
					w='100%'
					onSubmit={form.onSubmit((values) => void onSubmit(values))}
				>
					<Stack>
						<TextInput
							placeholder='Email'
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

						<Stack spacing={10} mt={10}>
							{isError && (
								<Text color='red' fz={'xs'}>
									Something is wrong. Please try again!
								</Text>
							)}

							<Button
								disabled={isLoading}
								fullWidth
								type='submit'
								color='orange'
							>
								{isLoading ? <Loader variant='dots' color='gray' /> : 'Login'}
							</Button>
						</Stack>
					</Stack>
				</Box>

				{/* <Center>
					<Text fz='xs' fw={700} color='gray.6'>
						Login as Admin
					</Text>
				</Center> */}
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
