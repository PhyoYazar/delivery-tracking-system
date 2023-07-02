import { Box, Button } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export const GoBackButton = () => {
	const router = useRouter();

	return (
		<Box>
			<Button
				leftIcon={<IconArrowLeft size={20} />}
				onClick={() => void router.back()}
			>
				Back
			</Button>
		</Box>
	);
};
