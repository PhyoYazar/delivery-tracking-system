import { Stack, Tabs } from '@mantine/core';
import { useState } from 'react';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { CustomerTable } from '~/feature/customer/CustomerTable';

const CustomersPage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('sender');

	return (
		<Stack>
			<StyledTabs value={activeTab} onTabChange={setActiveTab}>
				<Tabs.List>
					<Tabs.Tab value='sender'>Sender</Tabs.Tab>
					<Tabs.Tab value='receiver'>Receiver</Tabs.Tab>
				</Tabs.List>

				<Tabs.Panel value='sender' mt={10}>
					<CustomerTable />
				</Tabs.Panel>

				<Tabs.Panel value='receiver' mt={10}>
					<CustomerTable />
				</Tabs.Panel>
			</StyledTabs>
		</Stack>
	);
};

export default CustomersPage;
