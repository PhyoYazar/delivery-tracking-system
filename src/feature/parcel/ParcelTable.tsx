import { Box, Button, Checkbox, Flex, Group, Text } from '@mantine/core';
import { type ColumnDef } from '@tanstack/table-core';
import { useMemo, type ReactNode } from 'react';
import type { ParcelResponse } from '~/types/parcel-api';
import { Table } from '../common/Table';
import { TableTextBox } from '../common/TableTextBox';

interface ParcelProps {
	data: ParcelResponse[];
}

export const ParcelTable = (props: ParcelProps) => {
	const { data } = props;

	const defaultColumns: ColumnDef<ParcelResponse>[] = useMemo(
		() => [
			{
				// TODO: checkbox accessorKey should be "id"
				accessorKey: 'Sender',
				accessorFn: (row) => row.sender.name,
				header: ({ table }) => {
					return (
						<Group spacing={12} w={200}>
							<Checkbox
								size='xs'
								checked={table.getIsAllRowsSelected()}
								indeterminate={table.getIsSomeRowsSelected()}
								onChange={(e) => {
									table.getToggleAllRowsSelectedHandler()(e);
								}}
							/>

							<Text>Sender</Text>
						</Group>
					);
				},
				cell: ({ getValue, row }) => (
					<Flex align='center' gap={12}>
						<Checkbox
							size='xs'
							{...{
								checked: row.getIsSelected(),
								disabled: !row.getCanSelect(),
								indeterminate: row.getIsSomeSelected(),
								onClick: (e) => e.stopPropagation(),
							}}
							onChange={(e) => {
								row.getToggleSelectedHandler()(e);
							}}
						/>

						<TableTextBox>{getValue() as ReactNode}</TableTextBox>
					</Flex>
				),
			},
			{
				id: 'Receiver',
				accessorFn: (row) => row.receiver.name,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Receiver</TableTextBox>,
			},
			{
				accessorKey: 'sender_location',
				accessorFn: (row) =>
					`${row.sender.address}, ${row.sender.township.name}, ${row.sender.city.name}`,
				header: () => <TableTextBox w={250}>Sender location</TableTextBox>,
			},
			{
				accessorKey: 'receiver_location',
				accessorFn: (row) =>
					`${row.receiver.address}, ${row.receiver.township.name}, ${row.receiver.city.name}`,
				header: () => <TableTextBox w={250}>Receiver location</TableTextBox>,
			},
			// {
			// 	accessorKey: 'deliver',
			// 	accessorFn: (row) => row.user.,
			// 	header: () => 'Deliver',
			// },

			{
				accessorKey: 'id',
				header: 'Edit',
				cell: () => (
					<Button size='sm' onClick={(e) => e.stopPropagation()}>
						Edit
					</Button>
				),
			},
		],
		[],
	);

	return (
		<Box pr={20}>
			<Table
				data={data}
				columns={defaultColumns}
				autoColumnWidth
				withBorder
				disabledRowClickDetail
			/>
		</Box>
	);
};
