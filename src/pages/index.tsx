import {
	Button,
	Center,
	Group,
	Loader,
	Modal,
	Select,
	Stack,
	Tabs,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconAlarm, IconCheck } from '@tabler/icons-react';
import { type GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import Head from 'next/head';
import { useCallback, useState } from 'react';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { ParcelTable } from '~/feature/parcel/ParcelTable';
import type { ParcelResponse } from '~/types';
import { api } from '~/utils/api';

export default function Home() {
	const [activeTab, setActiveTab] = useState<string>('parcels');

	const [senderTownshipValue, setSenderTownshipValue] = useState<string | null>(
		null,
	);
	const [receiverTownshipValue, setReceiverTownshipValue] = useState<
		string | null
	>(null);
	const [assigneeValue, setAssigneeValue] = useState<string | null>(null);

	const [selectedRowsIds, setSelectedRowsIds] = useState<string[]>([]);

	const [deleteId, setDeleteId] = useState('');

	const [opened, { open, close }] = useDisclosure(false);
	const utils = api.useContext();

	//*================================================================================================

	const { data: parcels, isLoading: parcelsIsLoading } =
		api.parcel.getAllParcels.useQuery({
			sender_township: senderTownshipValue,
			receiver_township: receiverTownshipValue,
		});

	const updateParcels = api.parcel.updateParcels.useMutation({
		onSuccess: () => {
			void utils.parcel.getAllParcels.invalidate();

			notifications.show({
				message: 'Successfully updated.',
				icon: <IconCheck size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'green',
			});
		},
		onError: () => {
			notifications.show({
				message: 'Failed to update. Please try again',
				icon: <IconAlarm size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'red',
			});
		},
	});

	const deleteParcel = api.parcel.deleteParcel.useMutation({
		onSuccess: () => {
			void utils.parcel.getAllParcels.invalidate();

			notifications.show({
				message: 'Parcel is successfully deleted!',
				icon: <IconCheck size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'green',
			});

			close();
		},
		onError: () => {
			notifications.show({
				message: 'Failed to delete. Please try again',
				icon: <IconAlarm size='1rem' />,
				autoClose: true,
				withCloseButton: true,
				color: 'red',
			});
		},
	});

	//*================================================================================================

	const { data: deliver, isLoading: deliverIsLoading } =
		api.deliver.getDelivers.useQuery();

	const pickers =
		!deliverIsLoading && deliver !== 'Error' && deliver !== undefined
			? deliver
					.filter((pick) => pick.role === 'picker')
					.map((picker) => ({
						value: picker.id,
						label: picker.name,
					}))
			: [{ value: '', label: '' }];

	const delivers =
		!deliverIsLoading && deliver !== 'Error' && deliver !== undefined
			? deliver
					.filter((de) => de.role === 'deliver')
					.map((deli) => ({
						value: deli.id,
						label: deli.name,
					}))
			: [{ value: '', label: '' }];

	//*================================================================================================

	// const { data: city } = api.location.getCity.useQuery();
	const { data: township, isLoading: townshipIsLoading } =
		api.location.getTownship.useQuery();

	const townshipData =
		!townshipIsLoading && township !== 'Error' && township !== undefined
			? township.map((town) => ({
					value: town.name,
					label: town.name,
			  }))
			: [{ value: '', label: '' }];

	//*================================================================================================

	const getSelectedRowsHandler = useCallback((value: ParcelResponse[]) => {
		setSelectedRowsIds(value.map((val) => val.id));
	}, []);

	const deleteHandler = () => {
		if (deleteId === '') return;

		deleteParcel.mutate({ id: deleteId });
	};

	const assignHandler = () => {
		if (selectedRowsIds.length === 0) {
			return;
		}

		let stage: string;
		switch (activeTab) {
			case 'parcels':
				stage = 'picked_up';
				break;
			case 'picked_up':
				stage = 'arrived_warehouse';
				break;
			case 'arrived_warehouse':
				stage = 'deliver';
				break;
			case 'deliver':
				stage = 'finish';
				break;
			default:
				stage = 'picked_up';
				break;
		}

		updateParcels.mutate({
			parcels: selectedRowsIds,
			user_id: assigneeValue,
			[stage]: true,
		});
	};

	//*================================================================================================

	if (parcelsIsLoading) {
		return (
			<Center w='100%' h='70svh'>
				<Loader />
			</Center>
		);
	}

	if (parcels === 'Error' || parcels === undefined) {
		return <div>Error</div>;
	}

	const parcelsBooking = parcels.filter(
		(parcel) =>
			!parcel.finish &&
			!parcel.arrived_warehouse &&
			!parcel.deliver &&
			!parcel.picked_up,
	);

	const pickUpParcels = parcels.filter(
		(parcel) =>
			parcel.picked_up &&
			!parcel.arrived_warehouse &&
			!parcel.deliver &&
			!parcel.finish,
	);
	const arrivedWarehouseParcels = parcels.filter(
		(parcel) => parcel.arrived_warehouse && !parcel.deliver && !parcel.finish,
	);
	const deliverParcels = parcels.filter(
		(parcel) => parcel.deliver && !parcel.finish,
	);
	const finishParcels = parcels.filter((parcel) => parcel.finish);

	return (
		<>
			<Head>
				<title>Home</title>
				<meta name='description' content='Delivery Tracking System' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Stack>
				{/* <LocationTracker /> */}

				<StyledTabs
					value={activeTab}
					onTabChange={(val: string) => {
						setActiveTab(val);
						setSelectedRowsIds([]);
					}}
				>
					<Group position='apart'>
						<Tabs.List>
							<Tabs.Tab value='parcels'>Parcels Bookings</Tabs.Tab>
							<Tabs.Tab value='picked_up'>Pick up</Tabs.Tab>
							<Tabs.Tab value='arrived_warehouse'>Warehouse</Tabs.Tab>
							<Tabs.Tab value='deliver'>Deliver</Tabs.Tab>
							<Tabs.Tab value='finish'>Finish</Tabs.Tab>
						</Tabs.List>

						<Group spacing={10}>
							{activeTab === 'parcels' && (
								<Select
									w={240}
									placeholder='Filter by Sender township'
									clearable
									value={senderTownshipValue}
									onChange={setSenderTownshipValue}
									data={townshipData}
								/>
							)}
							{activeTab === 'arrived_warehouse' && (
								<Select
									w={240}
									placeholder='Filter by Receiver township'
									clearable
									value={receiverTownshipValue}
									onChange={setReceiverTownshipValue}
									data={townshipData}
								/>
							)}
							{/* {['parcels', 'arrived_warehouse'].includes(activeTab) && (
								<>
									<Select
										w={150}
										placeholder='Assign to'
										clearable
										value={assigneeValue}
										onChange={setAssigneeValue}
										data={activeTab === 'parcels' ? pickers : delivers}
									/>
									<Button
										w={90}
										disabled={
											assigneeValue === null ||
											selectedRowsIds.length === 0 ||
											updateParcels.isLoading
										}
										onClick={assignHandler}
									>
										{updateParcels.isLoading ? (
											<Loader size='sm' color='gray' />
										) : (
											'Assign'
										)}
									</Button>
								</>
							)} */}
						</Group>
					</Group>

					<Tabs.Panel value='parcels' mt={10}>
						{parcelsBooking.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no booking parcels.
							</Center>
						) : (
							<ParcelTable
								tabType='parcels'
								data={parcelsBooking}
								getSelectedRows={getSelectedRowsHandler}
							/>
						)}
					</Tabs.Panel>

					<Tabs.Panel value='picked_up' mt={10}>
						{pickUpParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no picking up parcels.
							</Center>
						) : (
							<ParcelTable
								data={pickUpParcels}
								getSelectedRows={getSelectedRowsHandler}
							/>
						)}
					</Tabs.Panel>

					<Tabs.Panel value='arrived_warehouse' mt={10}>
						{arrivedWarehouseParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no parcels at warehouse.
							</Center>
						) : (
							<ParcelTable
								tabType='warehouse'
								data={arrivedWarehouseParcels}
								getSelectedRows={getSelectedRowsHandler}
							/>
						)}
					</Tabs.Panel>

					<Tabs.Panel value='deliver' mt={10}>
						{deliverParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no delivering parcels.
							</Center>
						) : (
							<ParcelTable
								data={deliverParcels}
								getSelectedRows={getSelectedRowsHandler}
							/>
						)}
					</Tabs.Panel>

					<Tabs.Panel value='finish' mt={10}>
						{finishParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no parcels that finished.
							</Center>
						) : (
							<ParcelTable
								tabType='finish'
								data={finishParcels}
								getSelectedRows={getSelectedRowsHandler}
								deleteHandler={(id: string) => {
									setDeleteId(id);
									open();
								}}
							/>
						)}
					</Tabs.Panel>
				</StyledTabs>
			</Stack>

			<Modal opened={opened} onClose={close} centered>
				<Stack spacing={40}>
					<Center>
						<Title color='red.7'>Are you sure to delete the parcel?</Title>
					</Center>

					<Group w='100%' noWrap>
						<Button
							color='gray'
							fullWidth
							variant='outline'
							disabled={deleteParcel.isLoading}
							onClick={close}
						>
							Cancel
						</Button>
						<Button
							color='red'
							fullWidth
							disabled={deleteParcel.isLoading}
							onClick={deleteHandler}
						>
							{deleteParcel.isLoading ? <Loader size={'sm'} /> : 'Delete'}
						</Button>
					</Group>
				</Stack>
			</Modal>
		</>
	);
}

export async function getServerSideProps(_context: GetServerSidePropsContext) {
	const session = await getSession({ req: _context.req });

	if (session?.user.role && ['picker', 'deliver'].includes(session.user.role)) {
		return {
			redirect: {
				destination: '/employee',
				permanent: false,
			},
		};
	}
	return {
		props: {}, // will be passed to the page component as props
	};
}
