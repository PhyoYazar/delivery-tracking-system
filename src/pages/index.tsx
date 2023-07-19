import { Stack, Tabs } from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import { StyledTabs } from '~/feature/common/CustomTabs';
import LocationTracker from '~/feature/common/LocationTracker';
import { ParcelTable } from '~/feature/parcel/ParcelTable';
import { api } from '~/utils/api';

export default function Home() {
	const [activeTab, setActiveTab] = useState<string | null>('parcels');
	const parcels = api.parcel.getAllParcels.useQuery();

	return (
		<>
			<Head>
				<title>Home</title>
				<meta name='description' content='Delivery Tracking System' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Stack h='100%'>
				<LocationTracker />

				<StyledTabs value={activeTab} onTabChange={setActiveTab}>
					<Tabs.List>
						<Tabs.Tab value='parcels'>Parcels Bookings</Tabs.Tab>
						<Tabs.Tab value='pick up'>Pick up</Tabs.Tab>
						<Tabs.Tab value='deliver'>Deliver</Tabs.Tab>
					</Tabs.List>

					<Tabs.Panel value='parcels' mt={10}>
						<ParcelTable />
					</Tabs.Panel>

					<Tabs.Panel value='pick up' mt={10}>
						<ParcelTable />
					</Tabs.Panel>

					<Tabs.Panel value='deliver' mt={10}>
						<ParcelTable />
					</Tabs.Panel>
				</StyledTabs>

				<pre>{JSON.stringify(parcels, null, 3)}</pre>
			</Stack>
		</>
	);
}
