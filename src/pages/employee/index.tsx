import {
	Box,
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
	const [activeTab, setActiveTab] = useState<string | null>('parcels');
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

	const { data: pickerParcelsData, isLoading: pickerParcelIsLoading } =
		api.parcel.getAllParcels.useQuery(
			{
				pickerId: data?.user.id ?? null,
			},
			{
				enabled: !!data?.user.id,
			},
		);

	const pickerParcels =
		!pickerParcelIsLoading &&
		pickerParcelsData !== 'Error' &&
		pickerParcelsData !== undefined
			? pickerParcelsData
			: [];

	const { data: parcels, isLoading } = api.parcel.getParcelsByUser.useQuery({
		...obj,
	});

	const autoAssign = api.parcel.autoAssign.useMutation();

	const updateParcel = api.parcel.updateParcel.useMutation({
		onSuccess: () => {
			void utils.parcel.getParcelsByUser.invalidate();

			notifications.show({
				message: 'Accept the parcel Successfully!',
				icon: <IconCheck size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'green',
			});
		},
		onError: () => {
			notifications.show({
				message: 'Failed to accept the parcel. Please try again',
				icon: <IconAlarm size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'red',
			});
		},
	});

	const createTimeline = api.timeline.createParcel.useMutation();

	const updateManyParcels = api.parcel.updateParcels.useMutation({
		onSuccess: (resp) => {
			void utils.parcel.getParcelsByUser.invalidate();

			if (resp?.status === 'success') {
				resp?.data.forEach(
					({ id, picked_up, arrived_warehouse, deliver, finish }) => {
						let type = '';

						if (picked_up && !arrived_warehouse && !deliver && !finish) {
							type = 'start_pick_up';
						} else if (arrived_warehouse && !deliver && !finish) {
							type = 'arrive_warehouse';
						} else if (deliver && !finish) {
							type = 'start_deliver';
						} else if (finish) {
							type = 'finish';
						}

						if (type !== '') {
							createTimeline.mutate({ type, parcel_id: id });
						}
					},
				);
			}

			notifications.show({
				message: 'Success!',
				icon: <IconCheck size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'green',
			});

			close();
		},
		onError: () => {
			notifications.show({
				message: 'Failed. Please try again',
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

	const accept_parcels =
		!isLoading && parcels !== 'Error' && parcels !== undefined
			? parcels.filter((parcel) =>
					isPicker
						? !parcel.accept_picked_up && !parcel.picked_up
						: parcel.arrived_warehouse &&
						  !parcel.accept_deliver &&
						  !parcel.deliver,
			  )
			: [];

	const unfinishParcels =
		!isLoading && parcels !== 'Error' && parcels !== undefined
			? parcels.filter((parcel) =>
					isPicker
						? parcel.accept_picked_up && !parcel.arrived_warehouse
						: parcel.accept_deliver && !parcel.finish,
			  )
			: [];

	const isStarted = unfinishParcels.every((p) =>
		isPicker ? p.picked_up : p.deliver,
	);

	const finishParcels =
		!isLoading && parcels !== 'Error' && parcels !== undefined
			? parcels.filter((parcel) =>
					isPicker ? parcel.arrived_warehouse : parcel.finish,
			  )
			: [];

	const finishParcelsLength = isPicker
		? pickerParcels.length
		: finishParcels.length;

	const acceptHandler = (id: string) => {
		if (id === '') return;

		const obj: {
			id: string;
			accept_picked_up?: boolean;
			accept_deliver?: boolean;
			pickerId?: string;
		} = {
			id,
		};

		if (isPicker) {
			obj['accept_picked_up'] = true;
		} else {
			obj['accept_deliver'] = true;
		}

		if (data?.user.id) {
			obj['pickerId'] = data.user.id;
		}

		updateParcel.mutate(obj);
	};

	const startHandler = () => {
		if (unfinishParcels.length === 0) return;

		const obj: { parcels: string[]; picked_up?: boolean; deliver?: boolean } = {
			parcels: unfinishParcels.map((p) => p.id),
		};

		if (isPicker) {
			obj['picked_up'] = true;
		} else {
			obj['deliver'] = true;
		}

		updateManyParcels.mutate(obj);
	};

	const confirmHandler = () => {
		if (unfinishParcels.length === 0) return;

		const parcelIds = unfinishParcels.map((p) => p.id);

		const obj: {
			parcels: string[];
			arrived_warehouse?: boolean;
			finish?: boolean;
		} = {
			parcels: parcelIds,
		};

		if (isPicker) {
			obj['arrived_warehouse'] = true;
		} else {
			obj['finish'] = true;
		}

		updateManyParcels.mutate(obj);

		for (const parcelId of parcelIds) {
			autoAssign.mutate({ id: parcelId, role: 'deliver' });
		}
	};

	return (
		<>
			<StyledTabs value={activeTab} onTabChange={setActiveTab}>
				<Group position='apart'>
					<Group sx={{ position: 'relative' }}>
						<Box
							sx={(theme) => ({
								position: 'absolute',
								top: -5,
								left: -5,
								padding: 1,
								fontSize: theme.fontSizes.sm,
								borderRadius: 100,
								width: 18,
								backgroundColor: accept_parcels.length > 0 ? 'red' : '#ababab',
								color: accept_parcels.length === 0 ? '#333' : '#f7f7f7',
								textAlign: 'center',
							})}
						>
							{accept_parcels.length}
						</Box>

						<Tabs.List>
							<Tabs.Tab value='parcels'>Parcels</Tabs.Tab>
							<Tabs.Tab value='unfinish'>
								{isPicker ? 'Pick Up' : 'Deliver'}
							</Tabs.Tab>
							<Tabs.Tab value='finish'>Done</Tabs.Tab>
						</Tabs.List>
						<Button
							loading={updateManyParcels.isLoading}
							disabled={updateManyParcels.isLoading || isStarted}
							onClick={startHandler}
						>
							{isPicker ? 'Start Pick up' : 'Start Deliver'}
						</Button>
						<Button
							loading={updateManyParcels.isLoading}
							disabled={
								updateManyParcels.isLoading ||
								!isStarted ||
								unfinishParcels.length === 0
							}
							onClick={() => open()}
						>
							Finish
						</Button>
					</Group>

					<TextInput
						w={250}
						placeholder={`Filter by address`}
						value={address}
						onChange={(event) => setAddress(event.currentTarget.value)}
					/>
				</Group>

				<Tabs.Panel value='parcels' mt={10}>
					{isLoading ? (
						<CenterLoader />
					) : accept_parcels.length === 0 ? (
						<Center h={'60svh'}>No Data</Center>
					) : (
						<EmployeeParcelTable
							actionIsLoading={updateParcel.isLoading}
							showAction
							data={accept_parcels}
							acceptHandler={acceptHandler}
							isDeliver={false}
						/>
					)}
				</Tabs.Panel>

				<Tabs.Panel value='unfinish' mt={10}>
					{isLoading ? (
						<CenterLoader />
					) : unfinishParcels.length === 0 ? (
						<Center h={'60svh'}>No Data</Center>
					) : (
						<EmployeeParcelTable data={unfinishParcels} isDeliver={!isPicker} />
					)}
				</Tabs.Panel>

				<Tabs.Panel value='finish' mt={10}>
					{isLoading ? (
						<CenterLoader />
					) : finishParcelsLength === 0 ? (
						<Center h={'60svh'}>No Data</Center>
					) : (
						<EmployeeParcelTable
							data={isPicker ? pickerParcels : finishParcels}
							isDeliver={!isPicker}
						/>
					)}
				</Tabs.Panel>
			</StyledTabs>

			<Modal opened={opened} onClose={close} centered>
				<Stack spacing={40}>
					<Center>
						<Title color='gray.8'>
							{isPicker ? 'Picking' : 'Delivering'} the parcels are done?
						</Title>
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
							loading={updateManyParcels.isLoading}
							disabled={updateManyParcels.isLoading}
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
