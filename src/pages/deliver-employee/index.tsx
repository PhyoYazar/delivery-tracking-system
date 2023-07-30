import { Button, Group, Modal, Stack, Tabs, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { CenterLoader } from '~/feature/common/CenterLoader';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { CreateDeliveryEmployee } from '~/feature/delivery/CreateDelivery';
import { DeliverTable } from '~/feature/delivery/DeliverTable';
import { api } from '~/utils/api';

const DeliEmployeePage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('picker');
	const [opened, { open, close }] = useDisclosure(false);

	const { data: delivers, isLoading } = api.deliver.getDelivers.useQuery();

	if (isLoading) {
		return <CenterLoader />;
	}

	if (delivers === 'Error' || delivers === undefined) {
		return <div>Error</div>;
	}

	const picker = delivers.filter((deli) => deli.role === 'picker');
	const deliver = delivers.filter((deli) => deli.role === 'deliver');

	return (
		<Stack>
			<StyledTabs value={activeTab} onTabChange={setActiveTab}>
				<Group position='apart'>
					<Tabs.List>
						<Tabs.Tab value='picker'>Picker</Tabs.Tab>
						<Tabs.Tab value='deliver'>Deliver</Tabs.Tab>
					</Tabs.List>
					<Button onClick={open}>Create Deliver</Button>
				</Group>

				<Tabs.Panel value='picker' mt={10}>
					<DeliverTable data={picker} />
				</Tabs.Panel>

				<Tabs.Panel value='deliver' mt={10}>
					<DeliverTable data={deliver} />
				</Tabs.Panel>
			</StyledTabs>

			<Modal
				opened={opened}
				onClose={close}
				centered
				closeOnClickOutside={false}
				size={'lg'}
				padding={'xl'}
				title={
					<Title order={3} color='gray.8'>
						Create Delivery Employee
					</Title>
				}
			>
				{/* Modal content */}
				<CreateDeliveryEmployee close={close} />
			</Modal>
		</Stack>
	);
};

export default DeliEmployeePage;
