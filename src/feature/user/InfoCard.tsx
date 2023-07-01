import {
	Badge,
	Card,
	Group,
	Stack,
	Text,
	useMantineTheme,
} from '@mantine/core';
import { IconAffiliateFilled } from '@tabler/icons-react';

export const InfoCard = () => {
	const theme = useMantineTheme();

	return (
		<Card>
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
