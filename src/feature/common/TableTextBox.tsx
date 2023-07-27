import { Box, type BoxProps } from '@mantine/core';

type Props = BoxProps & {
	children: React.ReactNode;
};

export const TableTextBox = ({ children }: Props) => {
	return (
		<Box tt={'capitalize'} w={200}>
			{children}
		</Box>
	);
};
