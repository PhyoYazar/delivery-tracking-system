import {
	Button,
	Center,
	Group,
	Loader,
	Select,
	Stack,
	Tabs,
} from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { ParcelTable } from '~/feature/parcel/ParcelTable';
import { api } from '~/utils/api';

export default function Home() {
	const [activeTab, setActiveTab] = useState<string | null>('parcels');

	const [senderTownshipValue, setSenderTownshipValue] = useState<string | null>(
		null,
	);
	const [receiverTownshipValue, setReceiverTownshipValue] = useState<
		string | null
	>(null);
	const [assigneeValue, setAssigneeValue] = useState<string | null>(null);

	const { data: parcels, isLoading: parcelsIsLoading } =
		api.parcel.getAllParcels.useQuery({
			sender_township: senderTownshipValue,
			receiver_township: receiverTownshipValue,
		});

	const { data: deliver } = api.deliver.getDelivers.useQuery();

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

				<StyledTabs value={activeTab} onTabChange={setActiveTab}>
					<Group position='apart'>
						<Tabs.List>
							<Tabs.Tab value='parcels'>Parcels Bookings</Tabs.Tab>
							<Tabs.Tab value='pick up'>Pick up</Tabs.Tab>
							<Tabs.Tab value='warehouse'>Warehouse</Tabs.Tab>
							<Tabs.Tab value='deliver'>Deliver</Tabs.Tab>
							<Tabs.Tab value='finish'>Finish</Tabs.Tab>
						</Tabs.List>

						<Group spacing={10}>
							<Select
								w={160}
								placeholder='Filter by S town'
								clearable
								value={senderTownshipValue}
								onChange={setSenderTownshipValue}
								data={townshipData}
							/>
							<Select
								w={160}
								placeholder='Filter by R town'
								clearable
								value={receiverTownshipValue}
								onChange={setReceiverTownshipValue}
								data={townshipData}
							/>
							<Select
								w={150}
								placeholder='Assign to'
								clearable
								value={assigneeValue}
								onChange={setAssigneeValue}
								data={[
									{ value: 'john', label: 'John' },
									{ value: 'berry', label: 'Berry' },
								]}
							/>
							<Button disabled={assigneeValue === null}>Assign</Button>
						</Group>
					</Group>

					<Tabs.Panel value='parcels' mt={10}>
						{parcelsBooking.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no booking parcels.
							</Center>
						) : (
							<ParcelTable data={parcelsBooking} />
						)}
					</Tabs.Panel>

					<Tabs.Panel value='pick up' mt={10}>
						{pickUpParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no picking up parcels.
							</Center>
						) : (
							<ParcelTable data={pickUpParcels} />
						)}
					</Tabs.Panel>

					<Tabs.Panel value='warehouse' mt={10}>
						{arrivedWarehouseParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no parcels at warehouse.
							</Center>
						) : (
							<ParcelTable data={arrivedWarehouseParcels} />
						)}
					</Tabs.Panel>

					<Tabs.Panel value='deliver' mt={10}>
						{deliverParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no delivering parcels.
							</Center>
						) : (
							<ParcelTable data={deliverParcels} />
						)}
					</Tabs.Panel>

					<Tabs.Panel value='finish' mt={10}>
						{finishParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no parcels that finished.
							</Center>
						) : (
							<ParcelTable data={finishParcels} />
						)}
					</Tabs.Panel>
				</StyledTabs>
			</Stack>

			<pre>{JSON.stringify(deliver, null, 3)}</pre>
		</>
	);
}
