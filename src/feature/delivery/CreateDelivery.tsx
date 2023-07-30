import {
	Box,
	Button,
	Group,
	Loader,
	PasswordInput,
	ScrollArea,
	Select,
	Stack,
	TextInput,
} from '@mantine/core';
import { hasLength, isNotEmpty, matchesField, useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlarm, IconCheck } from '@tabler/icons-react';
import type { CreateDeliverForm } from '~/types';
import { api } from '~/utils/api';

interface Props {
	close: () => void;
}

export const CreateDeliveryEmployee = (props: Props) => {
	const { close } = props;

	const utils = api.useContext();

	const createDeliver = api.auth.signUp.useMutation({
		onSuccess() {
			void utils.deliver.getDelivers.invalidate();
			close();

			notifications.show({
				message: 'A delivery user have been successfully created.',
				icon: <IconCheck size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'green',
			});
		},
		onError: () => {
			notifications.show({
				message: 'Failed to create the delivery user. Please try again!',
				icon: <IconAlarm size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'red',
			});
		},
	});

	const form = useForm({
		initialValues: {
			name: '',
			email: '',
			address: '',
			phone_number: '',
			city_id: null,
			township_id: null,
			password: '',
			passwordConfirm: '',
			role: '',
		},

		validate: {
			name: isNotEmpty('Name must be empty'),
			email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
			phone_number: isNotEmpty('Phone number must be empty'),
			address: isNotEmpty('Address must be empty'),
			password: hasLength(
				{ min: 6 },
				'Name must be at least 6 characters long',
			),
			passwordConfirm: matchesField('password', 'Passwords are not the same'),
			role: isNotEmpty('Role must not be empty'),
		},
	});

	const onSubmit = (deliverInfo: CreateDeliverForm) => {
		const obj = {
			name: deliverInfo.name,
			email: deliverInfo.email,
			phone_number: deliverInfo.phone_number,
			address: deliverInfo.address,
			password: deliverInfo.password,
			city_id: deliverInfo.city_id,
			township_id: deliverInfo.township_id,
			role: deliverInfo.role,
		};

		createDeliver.mutate({ ...obj });
	};

	return (
		<Box
			component='form'
			onSubmit={form.onSubmit((values) => void onSubmit(values))}
		>
			<Stack>
				<ScrollArea h='65vh' offsetScrollbars type='never'>
					<Stack>
						<TextInput
							label='Employee name'
							placeholder='Joe Terry'
							withAsterisk
							{...form.getInputProps('name')}
						/>
						<TextInput
							label='Email'
							placeholder='joe@example.com'
							withAsterisk
							{...form.getInputProps('email')}
						/>
						<TextInput
							label='Phone Number'
							placeholder='09123456789'
							withAsterisk
							{...form.getInputProps('phone_number')}
						/>

						<TextInput
							label='Address'
							placeholder='No.123, Tarmwe, ...'
							withAsterisk
							{...form.getInputProps('address')}
						/>

						<Group noWrap>
							<TextInput
								w='100%'
								label='Township'
								placeholder='Hlaing'
								{...form.getInputProps('township')}
							/>
							<TextInput
								w='100%'
								label='City'
								placeholder='Yangon'
								{...form.getInputProps('city')}
							/>
						</Group>

						<PasswordInput
							label='Password'
							placeholder='123Je#$'
							withAsterisk
							{...form.getInputProps('password')}
						/>

						<PasswordInput
							label='Password Confirm'
							placeholder='123Je#$'
							withAsterisk
							{...form.getInputProps('passwordConfirm')}
						/>

						<Select
							label='Role'
							withAsterisk
							placeholder='Pick one'
							data={[
								{ value: 'picker', label: 'Picker' },
								{ value: 'deliver', label: 'Deliver' },
							]}
							{...form.getInputProps('role')}
						/>
					</Stack>
				</ScrollArea>

				<Group noWrap position='right'>
					<Box onClick={() => !createDeliver.isLoading && close()}>
						<Button w={120} component={Box} variant='outline' color='gray'>
							Cancel
						</Button>
					</Box>
					<Button w={120} type='submit' disabled={createDeliver.isLoading}>
						{createDeliver.isLoading ? <Loader size='sm' /> : 'Create'}
					</Button>
				</Group>
			</Stack>
		</Box>
	);
};
