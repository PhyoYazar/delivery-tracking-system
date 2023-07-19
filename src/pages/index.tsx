import { Button, Group, Select, Stack, Tabs } from '@mantine/core';
import Head from 'next/head';
import { useState } from 'react';
import { StyledTabs } from '~/feature/common/CustomTabs';
import LocationTracker from '~/feature/common/LocationTracker';
import { ParcelTable } from '~/feature/parcel/ParcelTable';
import { api } from '~/utils/api';

export default function Home() {
	const [activeTab, setActiveTab] = useState<string | null>('bookings');
	const [townshipValue, setTownshipValue] = useState<string | null>(null);
	const [assigneeValue, setAssigneeValue] = useState<string | null>(null);

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
					<Group position='apart'>
						<Tabs.List>
							<Tabs.Tab value='bookings'>Bookings</Tabs.Tab>
							<Tabs.Tab value='pick up'>Pick up</Tabs.Tab>
							<Tabs.Tab value='warehouse'>WareHouse</Tabs.Tab>
							<Tabs.Tab value='deliver'>Deliver</Tabs.Tab>
							<Tabs.Tab value='finish'>Finish</Tabs.Tab>
						</Tabs.List>

						<Group spacing={10}>
							<Select
								w={150}
								placeholder='Filter by township'
								clearable
								value={townshipValue}
								onChange={setTownshipValue}
								data={[
									{ value: 'react', label: 'React' },
									{ value: 'vue', label: 'Vue' },
								]}
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

					<Tabs.Panel value='bookings' mt={10}>
						<ParcelTable />
					</Tabs.Panel>

					<Tabs.Panel value='pick up' mt={10}>
						<ParcelTable />
					</Tabs.Panel>

					<Tabs.Panel value='warehouse' mt={10}>
						<ParcelTable />
					</Tabs.Panel>

					<Tabs.Panel value='deliver' mt={10}>
						<ParcelTable />
					</Tabs.Panel>

					<Tabs.Panel value='finish' mt={10}>
						<ParcelTable />
					</Tabs.Panel>
				</StyledTabs>

				<pre>{JSON.stringify(parcels, null, 3)}</pre>
			</Stack>
		</>
	);
}
