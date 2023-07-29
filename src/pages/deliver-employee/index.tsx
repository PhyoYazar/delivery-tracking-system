import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CenterLoader } from '~/feature/common/CenterLoader';
import { CreateDeliveryEmployee } from '~/feature/delivery/CreateDelivery';
import { DeliverTable } from '~/feature/delivery/DeliverTable';
import { api } from '~/utils/api';

const DeliEmployeePage = () => {
	const [opened, { open, close }] = useDisclosure(false);

	const { data: delivers, isLoading } = api.deliver.getDelivers.useQuery();

	if (isLoading) {
		return <CenterLoader />;
	}

	if (delivers === 'Error' || delivers === undefined) {
		return <div>Error</div>;
	}

	return (
		<Stack>
			<Group position='apart'>
				<Text>Delivery Information</Text>

				<Button onClick={open}>Create Deliver</Button>
			</Group>

			<DeliverTable data={delivers} />

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
				<CreateDeliveryEmployee />
			</Modal>
		</Stack>
	);
};

export default DeliEmployeePage;
