import { Box, Center, Divider, Group } from '@mantine/core';
import { GoBackButton } from '~/feature/common/GoBackButton';
import { DeliveryStepper } from '~/feature/delivery/DeliveryStepper';
import { DeliveryTimeline } from '~/feature/delivery/DeliveryTimeline';

const DeliveryPage = () => {
	return (
		<Box w='100vw' h='100vh' p={20}>
			<GoBackButton />
			<Center w='100%' h='100%'>
				<Group w={'90%'} h='100%' spacing={30} position='apart' noWrap>
					<DeliveryStepper />

					<Divider orientation='vertical' />

					<DeliveryTimeline />
				</Group>
			</Center>
		</Box>
	);
};

export default DeliveryPage;
