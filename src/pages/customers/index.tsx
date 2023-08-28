import { Group, Select, Stack, Tabs } from '@mantine/core';
import { useState } from 'react';
import { CenterLoader } from '~/feature/common/CenterLoader';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { ReceiverTable } from '~/feature/customer/ReceiverTable';
import { SenderTable } from '~/feature/customer/SenderTable';
import { api } from '~/utils/api';
import { useTownship } from '~/utils/hooks/useTownship';

const CustomersPage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('sender');
	const [townshipValue, setTownshipValue] = useState<string | null>(null);

	const { data: senders, isLoading: senderLoading } =
		api.customer.getSenders.useQuery(
			{ township_id: townshipValue },
			{ enabled: activeTab === 'sender' },
		);
	const { data: receivers, isLoading: receiverLoading } =
		api.customer.getReceivers.useQuery(
			{ township_id: townshipValue },
			{ enabled: activeTab === 'receiver' },
		);

	const { township, townshipIsLoading } = useTownship();

	const townshipData =
		!townshipIsLoading && township !== undefined
			? township.map((town) => ({
					value: town.id,
					label: town.name,
			  }))
			: [{ value: '', label: '' }];

	if (activeTab === 'sender' && senderLoading) {
		return <CenterLoader />;
	}

	if (activeTab === 'receiver' && receiverLoading) {
		return <CenterLoader />;
	}

	if (activeTab === 'sender' && senders === undefined) {
		return <div>Error</div>;
	}

	if (activeTab === 'receiver' && receivers === undefined) {
		return <div>Error</div>;
	}

	return (
		<Stack>
			<StyledTabs value={activeTab} onTabChange={setActiveTab}>
				<Group position='apart'>
					<Tabs.List>
						<Tabs.Tab value='sender'>Sender</Tabs.Tab>
						<Tabs.Tab value='receiver'>Receiver</Tabs.Tab>
					</Tabs.List>

					<Select
						w={240}
						placeholder='Filter by township'
						clearable
						value={townshipValue}
						onChange={setTownshipValue}
						data={townshipData}
					/>
				</Group>

				<Tabs.Panel value='sender' mt={10}>
					<SenderTable data={senders ?? []} />
				</Tabs.Panel>

				<Tabs.Panel value='receiver' mt={10}>
					<ReceiverTable data={receivers ?? []} />
				</Tabs.Panel>
			</StyledTabs>
		</Stack>
	);
};

export default CustomersPage;
