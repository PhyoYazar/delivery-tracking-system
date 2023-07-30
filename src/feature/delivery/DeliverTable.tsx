import { Flex, Group } from '@mantine/core';
import { type ColumnDef } from '@tanstack/react-table';
import { useMemo, type ReactNode } from 'react';
import type { Deliver } from '~/types';
import { Table } from '../common/Table';
import { TableTextBox } from '../common/TableTextBox';

interface Props {
	data: Deliver[];
}

export const DeliverTable = (props: Props) => {
	const { data } = props;

	const defaultColumns: ColumnDef<Deliver>[] = useMemo(
		() => [
			{
				// TODO: checkbox accessorKey should be "id"
				accessorKey: 'name',
				accessorFn: (row) => row.name,
				header: ({ table }) => {
					return (
						<Group spacing={12} noWrap>
							{/* <Checkbox
								size='xs'
								checked={table.getIsAllRowsSelected()}
								indeterminate={table.getIsSomeRowsSelected()}
								onChange={(e) => {
									table.getToggleAllRowsSelectedHandler()(e);
								}}
							/> */}

							<TableTextBox>Name</TableTextBox>
						</Group>
					);
				},
				cell: ({ getValue, row }) => (
					<Flex align='center' gap={12}>
						{/* <Checkbox
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
						/> */}

						<TableTextBox>{getValue() as ReactNode}</TableTextBox>
					</Flex>
				),
			},
			{
				id: 'email',
				accessorFn: (row) => row.email,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Email</TableTextBox>,
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
				cell: (info) => info.getValue() || '-',
				header: () => <TableTextBox>Address</TableTextBox>,
			},
			{
				id: 'city',
				accessorFn: (row) => row?.city?.name || '-',
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>City</TableTextBox>,
			},
			{
				id: 'township',
				accessorFn: (row) => row?.township?.name || '-',
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Township</TableTextBox>,
			},

			// {
			// 	accessorKey: 'id',
			// 	header: 'Edit',
			// 	cell: () => <Button onClick={(e) => e.stopPropagation()}>Edit</Button>,
			// },
		],
		[],
	);

	return (
		<Table
			data={data}
			columns={defaultColumns}
			autoColumnWidth
			withBorder
			disabledRowClickDetail
		/>
	);
};
