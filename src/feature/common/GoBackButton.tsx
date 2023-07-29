import { Button, type ButtonProps } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import { useRouter } from 'next/router';

export const GoBackButton = (props: ButtonProps) => {
	const router = useRouter();

	return (
		<Button
			{...props}
			leftIcon={<IconArrowLeft size={20} />}
			onClick={() => void router.back()}
		>
			Back
		</Button>
	);
};
