import {
	Button,
	Group,
	Modal,
	Select,
	Stack,
	Tabs,
	Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { CenterLoader } from '~/feature/common/CenterLoader';
import { StyledTabs } from '~/feature/common/CustomTabs';
import { CreateDeliveryEmployee } from '~/feature/delivery/CreateDelivery';
import { DeliverTable } from '~/feature/delivery/DeliverTable';
import { api } from '~/utils/api';
import { useTownship } from '~/utils/hooks/useTownship';

const DeliEmployeePage = () => {
	const [activeTab, setActiveTab] = useState<string | null>('picker');
	const [townshipValue, setTownshipValue] = useState<string | null>(null);

	const [opened, { open, close }] = useDisclosure(false);

	const { data: delivers, isLoading } = api.deliver.getDelivers.useQuery({
		township_id: townshipValue,
	});

	const { township, townshipIsLoading } = useTownship();

	const townshipData =
		!townshipIsLoading && township !== undefined
			? township.map((town) => ({
					value: town.id,
					label: town.name,
			  }))
			: [{ value: '', label: '' }];

	if (isLoading) {
		return <CenterLoader />;
	}

	if (delivers === undefined) {
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

					<Group>
						<Select
							w={240}
							placeholder='Filter by township'
							clearable
							value={townshipValue}
							onChange={setTownshipValue}
							data={townshipData}
						/>

						<Button onClick={open}>Create Deliver</Button>
					</Group>
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
