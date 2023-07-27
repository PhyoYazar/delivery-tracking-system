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

	console.log(data);

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
				accessorKey: 'sender_address',
				accessorFn: (row) => row.sender.address,
				header: () => <TableTextBox>Sender Address</TableTextBox>,
			},
			{
				accessorKey: 'receiver_address',
				accessorFn: (row) => row.receiver.address,
				header: () => <TableTextBox>Receiver Address</TableTextBox>,
			},
			{
				accessorKey: 'sender_region',
				accessorFn: (row) =>
					`${row.sender.township.name}, ${row.sender.city.name}`,
				header: () => <TableTextBox>Sender Region</TableTextBox>,
			},
			{
				accessorKey: 'receiver_region',
				accessorFn: (row) =>
					`${row.receiver.township.name}, ${row.receiver.city.name}`,
				header: () => <TableTextBox>Receiver Region</TableTextBox>,
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
