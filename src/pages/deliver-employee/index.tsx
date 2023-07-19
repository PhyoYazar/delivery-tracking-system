import { Button, Group, Modal, Stack, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { CreateDeliveryEmployee } from '~/feature/delivery/CreateDelivery';
import { DeliverTable } from '~/feature/delivery/DeliverTable';

const DeliEmployeePage = () => {
	const [opened, { open, close }] = useDisclosure(false);

	return (
		<Stack>
			<Group position='apart'>
				<Text>Delivery Information</Text>

				<Button onClick={open}>Create Deliver</Button>
			</Group>

			<DeliverTable />

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
