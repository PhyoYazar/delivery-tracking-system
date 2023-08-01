import { Box, Button, Flex, Group } from '@mantine/core';
import { type ColumnDef } from '@tanstack/table-core';
import { useMemo, type ReactNode } from 'react';
import type { ParcelResponse } from '~/types/parcel-api';
import { Table } from '../common/Table';
import { TableTextBox } from '../common/TableTextBox';

interface ParcelProps {
	data: ParcelResponse[];
	isDeliver: boolean;
	showAction?: boolean;
	getSelectedRows?: (val: ParcelResponse[]) => void;
	selectIdHandler: (id: string) => void;
	openModal: () => void;
}

export const EmployeeParcelTable = (props: ParcelProps) => {
	const {
		data,
		isDeliver,
		showAction = false,
		openModal,
		selectIdHandler,
	} = props;

	const defaultColumns: ColumnDef<ParcelResponse>[] = useMemo(() => {
		const columns: ColumnDef<ParcelResponse>[] = [
			{
				// TODO: checkbox accessorKey should be "id"
				accessorKey: 'product_id',
				accessorFn: (row) => row.id.slice(0, 5),
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

							<TableTextBox>Product ID</TableTextBox>
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

						<TableTextBox tt={'uppercase'}>
							{getValue() as ReactNode}
						</TableTextBox>
					</Flex>
				),
			},
			{
				id: 'price',
				accessorFn: (row) => row.price,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Price</TableTextBox>,
			},
			{
				id: 'customer_name',
				accessorFn: (row) => (isDeliver ? row.receiver.name : row.sender.name),
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Customer Name</TableTextBox>,
			},
			{
				accessorKey: 'address',
				accessorFn: (row) =>
					isDeliver
						? `${row.receiver.address}, ${row.receiver.township.name}, ${row.receiver.city.name}`
						: `${row.sender.address}, ${row.sender.township.name}, ${row.sender.city.name}`,
				header: () => <TableTextBox w={250}>Address</TableTextBox>,
			},

			// {
			// 	accessorKey: 'deliver',
			// 	accessorFn: (row) => row.user.,
			// 	header: () => 'Deliver',
			// },
		];

		if (showAction) {
			columns.push({
				accessorKey: 'id',
				accessorFn: (row) => row.id,
				header: () => (
					<TableTextBox w={100} pl={50}>
						Action
					</TableTextBox>
				),
				cell: ({ getValue }) => (
					<Box pl={50}>
						<Button
							size='sm'
							onClick={(e) => {
								e.stopPropagation();
								openModal();
								selectIdHandler(getValue() as string);
							}}
						>
							Done
						</Button>
					</Box>
				),
			});
		}

		return columns;
	}, [selectIdHandler, openModal, showAction, isDeliver]);

	return (
		<Box pr={20}>
			<Table
				data={data}
				columns={defaultColumns}
				autoColumnWidth
				withBorder
				disabledRowClickDetail
				// onSelectedRowsChange={getSelectedRows}
			/>
		</Box>
	);
};
