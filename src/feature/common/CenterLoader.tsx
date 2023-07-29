import { Center, Loader, type CenterProps } from '@mantine/core';

type Props = Omit<CenterProps, 'children'> & {
	variant?: 'bars' | 'oval' | 'dots';
};

export const CenterLoader = (props: Props) => {
	const { variant = 'oval', ...others } = props;
	return (
		<Center w='100%' h='70svh' {...others}>
			<Loader variant={variant} />
		</Center>
	);
};
