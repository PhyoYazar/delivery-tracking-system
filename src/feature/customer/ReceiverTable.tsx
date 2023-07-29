import { Box, Button, Checkbox, Flex, Group } from '@mantine/core';
import { type ColumnDef } from '@tanstack/table-core';
import { useMemo, type ReactNode } from 'react';
import type { Receiver } from '~/types';
import { Table } from '../common/Table';
import { TableTextBox } from '../common/TableTextBox';

interface Props {
	data: Receiver[];
}

export const ReceiverTable = (props: Props) => {
	const { data } = props;

	const defaultColumns: ColumnDef<Receiver>[] = useMemo(
		() => [
			{
				accessorKey: 'Name',
				accessorFn: (row) => row.name,
				header: ({ table }) => {
					return (
						<Group spacing={12} noWrap>
							<Checkbox
								size='xs'
								checked={table.getIsAllRowsSelected()}
								indeterminate={table.getIsSomeRowsSelected()}
								onChange={(e) => {
									table.getToggleAllRowsSelectedHandler()(e);
								}}
							/>

							<TableTextBox>Name</TableTextBox>
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
				id: 'phone_number',
				accessorFn: (row) => row.phone_number,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Phone Number</TableTextBox>,
			},
			{
				id: 'address',
				accessorFn: (row) => row.address,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Address</TableTextBox>,
			},
			{
				id: 'city',
				accessorFn: (row) => row.city.name,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>City</TableTextBox>,
			},
			{
				id: 'township',
				accessorFn: (row) => row.township.name,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Township</TableTextBox>,
			},

			{
				accessorKey: 'id',
				header: 'Edit',
				cell: () => <Button onClick={(e) => e.stopPropagation()}>Edit</Button>,
			},
		],
		[],
	);

	return (
		<Box pr={20}>
			<Table
				data={data}
				columns={defaultColumns}
				withBorder
				disabledRowClickDetail
			/>
		</Box>
	);
};
