import {
	Box,
	Button,
	Center,
	Flex,
	Group,
	Stack,
	TextInput,
	Title,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlarm, IconCheck } from '@tabler/icons-react';
import { useSession } from 'next-auth/react';
import { useState } from 'react';
import { GoBackButton } from '~/feature/common/GoBackButton';
import type { UserProfileForm } from '~/types';
import { api } from '~/utils/api';
import { filterTruthyProperties } from '~/utils/helpers';

const ProfilePage = () => {
	const [isEditable, setIsEditable] = useState<boolean>(false);

	const { data } = useSession();
	const isDeliver = data?.user.role === 'deliver';

	const utils = api.useContext();

	const { data: userData } = api.user.getUserById.useQuery(
		{
			id: data?.user.id ?? '',
		},
		{
			enabled: !!data?.user.id,
		},
	);

	const form = useForm({
		initialValues: {
			name: userData?.name || '',
			email: userData?.email || '',
			phone_number: userData?.phone_number || '',
			address: userData?.address || '',
			township: userData?.township?.name || '',
			city: userData?.city?.name || '',
		},
	});

	const userUpdate = api.user.updateUserById.useMutation({
		onSuccess: () => {
			void utils.user.getUserById.invalidate({ id: data?.user.id });
			notifications.show({
				message: 'Successfully updated.',
				icon: <IconCheck size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'green',
			});
		},
		onError: () => {
			form.reset();

			notifications.show({
				message: 'Failed to update. Please try again',
				icon: <IconAlarm size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'red',
			});
		},
	});

	const onSubmit = (userInfo: UserProfileForm) => {
		if (isDeliver) return null;
		if (data?.user.id === undefined) return;

		const obj = filterTruthyProperties(userInfo);

		//TODO: need to refactor and change this codes
		delete obj['city'];
		delete obj['township'];

		if (Object.keys(obj).length > 0) {
			userUpdate.mutate({ id: data?.user.id, ...obj });
		}
		setIsEditable(false);
	};

	return (
		<Center w='100vw' h='100svh'>
			<Box w={800} h={'90svh'}>
				<Stack h='100%' spacing={20}>
					<Group position='apart'>
						<GoBackButton color='gray' variant='outline' />
						<Title order={1} color='gray.7'>
							Profile
						</Title>
						<Box w={100} />
					</Group>

					<Box
						h='100%'
						component='form'
						onSubmit={form.onSubmit((values) => void onSubmit(values))}
					>
						<Stack spacing={30}>
							<Flex align={'center'} justify={'space-between'}>
								{/* {!isDeliver && (
									<>
										{!isEditable ? (
											<Box onClick={() => setIsEditable(true)}>
												<Button
													component={Box}
													color='gray.6'
													w={120}
													size='md'
												>
													Edit
												</Button>
											</Box>
										) : (
											<Group>
												<Box onClick={() => setIsEditable(false)}>
													<Button
														component={Box}
														variant='outline'
														w={120}
														color='gray.6'
														size='md'
													>
														Cancel
													</Button>
												</Box>
												<Button w={120} color='gray.6' size='md' type='submit'>
													Save
												</Button>
											</Group>
										)}
									</>
								)} */}
							</Flex>

							<TextInput
								size='md'
								readOnly={!isEditable}
								w='100%'
								placeholder='Your name'
								label='Full name'
								variant={isEditable ? 'default' : 'filled'}
								{...form.getInputProps('name')}
							/>
							<TextInput
								size='md'
								readOnly={!isEditable}
								w='100%'
								placeholder='Your email'
								label='Email'
								variant={isEditable ? 'default' : 'filled'}
								{...form.getInputProps('email')}
							/>
							<TextInput
								size='md'
								readOnly={!isEditable}
								w='100%'
								placeholder='Your phone number'
								label='Phone Number'
								variant={isEditable ? 'default' : 'filled'}
								{...form.getInputProps('phone_number')}
							/>
							<TextInput
								size='md'
								readOnly={!isEditable}
								w='100%'
								placeholder='Your address'
								label='Address'
								variant={isEditable ? 'default' : 'filled'}
								{...form.getInputProps('address')}
							/>

							<Group noWrap>
								<TextInput
									size='md'
									// readOnly={!isEditable}
									readOnly
									w='100%'
									placeholder='Your township'
									label='Township'
									variant='filled'
									{...form.getInputProps('township')}
								/>
								<TextInput
									size='md'
									// readOnly={!isEditable}
									readOnly
									w='100%'
									placeholder='Your city'
									label='City'
									variant='filled'
									{...form.getInputProps('city')}
								/>
							</Group>

							<Flex justify={'flex-end'}>
								{!isDeliver && (
									<>
										{!isEditable ? (
											<Box onClick={() => setIsEditable(true)}>
												<Button
													component={Box}
													color='gray.6'
													w={120}
													size='md'
												>
													Edit
												</Button>
											</Box>
										) : (
											<Group>
												<Box onClick={() => setIsEditable(false)}>
													<Button
														component={Box}
														variant='outline'
														w={120}
														color='gray.6'
														size='md'
													>
														Cancel
													</Button>
												</Box>
												<Button w={120} color='gray.6' size='md' type='submit'>
													Save
												</Button>
											</Group>
										)}
									</>
								)}
							</Flex>
						</Stack>
					</Box>
				</Stack>
			</Box>
		</Center>
	);
};

export default ProfilePage;
