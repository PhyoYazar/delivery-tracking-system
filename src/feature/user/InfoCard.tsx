import { Badge, Card, Group, Stack, Text } from '@mantine/core';
import { IconAffiliateFilled } from '@tabler/icons-react';

export const InfoCard = () => {
	return (
		<Card shadow='sm' padding='lg' radius='md' withBorder w={500}>
			<Group align='flex-start' noWrap>
				<IconAffiliateFilled size={40} />

				<Stack>
					<Text>Product</Text>
					<Badge>haha</Badge>
				</Stack>
			</Group>
		</Card>
	);
};
