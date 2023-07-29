import { Stack, Tabs } from '@mantine/core';
import { useState } from 'react';
import { CenterLoader } from '~/feature/common/CenterLoader';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { ReceiverTable } from '~/feature/customer/ReceiverTable';
import { SenderTable } from '~/feature/customer/SenderTable';
import { api } from '~/utils/api';

const CustomersPage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('sender');

	const { data: senders, isLoading: senderLoading } =
		api.customer.getSenders.useQuery();
	const { data: receivers, isLoading: receiverLoading } =
		api.customer.getReceivers.useQuery();

	if (senderLoading || receiverLoading) {
		return <CenterLoader />;
	}

	if (
		senders === 'Error' ||
		senders === undefined ||
		receivers === 'Error' ||
		receivers === undefined
	) {
		return <div>Error</div>;
	}

	return (
		<Stack>
			<StyledTabs value={activeTab} onTabChange={setActiveTab}>
				<Tabs.List>
					<Tabs.Tab value='sender'>Sender</Tabs.Tab>
					<Tabs.Tab value='receiver'>Receiver</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='sender' mt={10}>
					<SenderTable data={senders} />
				</Tabs.Panel>

				<Tabs.Panel value='receiver' mt={10}>
					<ReceiverTable data={receivers} />
				</Tabs.Panel>
			</StyledTabs>

			<pre>{JSON.stringify(senders, null, 3)}</pre>
			<pre>{JSON.stringify(receivers, null, 3)}</pre>
		</Stack>
	);
};

export default CustomersPage;
