import { Center, Group, Loader, Stack, Tabs } from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { ParcelTable } from '~/feature/parcel/ParcelTable';
import { api } from '~/utils/api';

export default function Home() {
	const [activeTab, setActiveTab] = useState<string | null>('parcels');
	const { data: parcels, isLoading } = api.parcel.getAllParcels.useQuery();

	if (isLoading) {
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

	const pickUpParcels = parcels.filter((parcel) => parcel.picked_up);
	const arrivedWarehouseParcels = parcels.filter(
		(parcel) => parcel.arrived_warehouse,
	);
	const deliverParcels = parcels.filter((parcel) => parcel.deliver);
	const finishParcels = parcels.filter((parcel) => parcel.finish);

	return (
		<>
			<Head>
				<title>Home</title>
				<meta name='description' content='Delivery Tracking System' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Stack h='100%'>
				{/* <LocationTracker /> */}

				<StyledTabs value={activeTab} onTabChange={setActiveTab}>
					<Group>
						<Tabs.List>
							<Tabs.Tab value='parcels'>Parcels Bookings</Tabs.Tab>
							<Tabs.Tab value='pick up'>Pick up</Tabs.Tab>
							<Tabs.Tab value='deliver'>Deliver</Tabs.Tab>
							<Tabs.Tab value='finish'>Finish</Tabs.Tab>
							<Tabs.Tab value='warehouse'>Warehouse</Tabs.Tab>
						</Tabs.List>
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

					<Tabs.Panel value='deliver' mt={10}>
						{deliverParcels.length === 0 ? (
							<Center w={'100%'} h={'70svh'}>
								There is no delivering parcels.
							</Center>
						) : (
							<ParcelTable data={deliverParcels} />
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

				<pre>{JSON.stringify(parcels, null, 3)}</pre>
			</Stack>
		</>
	);
}
