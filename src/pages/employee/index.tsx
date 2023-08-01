import {
	Button,
	Center,
	Group,
	Loader,
	Modal,
	Stack,
	Tabs,
	TextInput,
	Title,
} from '@mantine/core';
import { useDebouncedValue, useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlarm, IconCheck } from '@tabler/icons-react';
import { type GetServerSidePropsContext } from 'next';
import { getSession, useSession } from 'next-auth/react';
import { useState } from 'react';
import { CenterLoader } from '~/feature/common/CenterLoader';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { EmployeeParcelTable } from '~/feature/employee/EmployeeTable';
import { api } from '~/utils/api';

const EmployeePage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('unfinish');
	const [selectedId, setSelectedId] = useState<string>('');
	const [address, setAddress] = useState('');
	const [debouncedAddress] = useDebouncedValue(address, 500);

	const [opened, { open, close }] = useDisclosure(false);
	const utils = api.useContext();
	const { data } = useSession();

	const isPicker = data?.user.role === 'picker';

	const obj: { sender_address?: string; receiver_address?: string } = {};
	if (debouncedAddress.length !== 0) {
		if (isPicker) {
			obj['sender_address'] = debouncedAddress;
		} else {
			obj['receiver_address'] = debouncedAddress;
		}
	}

	const { data: parcels, isLoading } = api.parcel.getParcelsByUser.useQuery({
		...obj,
	});

	const updateParcel = api.parcel.updateParcel.useMutation({
		onSuccess: () => {
			void utils.parcel.getParcelsByUser.invalidate();

			notifications.show({
				message: 'Successfully updated.',
				icon: <IconCheck size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'green',
			});

			close();
		},
		onError: () => {
			notifications.show({
				message: 'Failed to update. Please try again',
				icon: <IconAlarm size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'red',
			});

			close();
		},
	});

	// if (isLoading) {
	// 	return <CenterLoader />;
	// }

	// if (parcels === 'Error' || parcels === undefined) {
	// 	return <div>Error</div>;
	// }

	const unfinishParcels =
		!isLoading && parcels !== 'Error' && parcels !== undefined
			? parcels.filter((parcel) =>
					isPicker
						? parcel.picked_up && !parcel.arrived_warehouse
						: parcel.deliver && !parcel.finish,
			  )
			: [];

	const finishParcels =
		!isLoading && parcels !== 'Error' && parcels !== undefined
			? parcels.filter((parcel) =>
					isPicker ? parcel.arrived_warehouse : parcel.finish,
			  )
			: [];

	const selectIdHandler = (id: string) => {
		setSelectedId(id);
	};

	const confirmHandler = () => {
		if (selectedId === '') return;

		const obj: { id: string; arrived_warehouse?: boolean; finish?: boolean } = {
			id: selectedId,
		};

		if (isPicker) {
			obj['arrived_warehouse'] = true;
		} else {
			obj['finish'] = true;
		}

		updateParcel.mutate(obj);
	};

	return (
		<>
			<StyledTabs value={activeTab} onTabChange={setActiveTab}>
				<Group position='apart'>
					<Tabs.List>
						<Tabs.Tab value='unfinish'>
							{isPicker ? 'Pick Up' : 'Deliver'}
						</Tabs.Tab>
						<Tabs.Tab value='finish'>Done</Tabs.Tab>
					</Tabs.List>
					<TextInput
						w={250}
						placeholder={`Filter by address`}
						value={address}
						onChange={(event) => setAddress(event.currentTarget.value)}
					/>
				</Group>

				<Tabs.Panel value='unfinish' mt={10}>
					{isLoading ? (
						<CenterLoader />
					) : unfinishParcels.length === 0 ? (
						<Center h={'60svh'}>No Data</Center>
					) : (
						<EmployeeParcelTable
							showAction
							data={unfinishParcels}
							selectIdHandler={selectIdHandler}
							openModal={open}
							isDeliver={!isPicker}
						/>
					)}
				</Tabs.Panel>

				<Tabs.Panel value='finish' mt={10}>
					{isLoading ? (
						<CenterLoader />
					) : finishParcels.length === 0 ? (
						<Center h={'60svh'}>No Data</Center>
					) : (
						<EmployeeParcelTable
							data={finishParcels}
							selectIdHandler={selectIdHandler}
							openModal={open}
							isDeliver={!isPicker}
						/>
					)}
				</Tabs.Panel>
			</StyledTabs>

			<Modal opened={opened} onClose={close} centered>
				<Stack spacing={40}>
					<Center>
						<Title color='gray.8'>Are you Sure?</Title>
					</Center>

					<Group w='100%' noWrap>
						<Button
							fullWidth
							variant='outline'
							disabled={updateParcel.isLoading}
							onClick={close}
						>
							Cancel
						</Button>
						<Button
							fullWidth
							disabled={updateParcel.isLoading}
							onClick={confirmHandler}
						>
							{updateParcel.isLoading ? <Loader size={'sm'} /> : 'Confirm'}
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	);
};

export default EmployeePage;

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	const session = await getSession({ req: _context.req });

	if (
		session?.user.role &&
		!['picker', 'deliver'].includes(session.user.role)
	) {
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
