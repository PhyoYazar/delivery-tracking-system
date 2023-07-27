import { Box, type BoxProps } from '@mantine/core';

type Props = BoxProps & {
	children: React.ReactNode;
};

export const TableTextBox = ({ children, ...other }: Props) => {
	return (
		<Box tt={'capitalize'} w={200} {...other}>
			{children}
		</Box>
	);
};
