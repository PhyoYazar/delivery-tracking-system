import { ActionIcon, Box, Menu } from '@mantine/core';
import {
	IconCircleCheck,
	IconCircleCheckFilled,
	IconDotsVertical,
	IconTrash,
} from '@tabler/icons-react';
import { type ColumnDef } from '@tanstack/table-core';
import { useMemo } from 'react';
import type { ParcelResponse } from '~/types/parcel-api';
import { Table } from '../common/Table';
import { TableTextBox } from '../common/TableTextBox';

interface ParcelProps {
	data: ParcelResponse[];
	getSelectedRows: (val: ParcelResponse[]) => void;
	tabType?: string;
	deleteHandler?: (id: string) => void;
}

export const ParcelTable = (props: ParcelProps) => {
	const { data, getSelectedRows, deleteHandler, tabType } = props;

	const defaultColumns: ColumnDef<ParcelResponse>[] = useMemo(
		() => [
			// {
			// 	// TODO: checkbox accessorKey should be "id"
			// 	accessorKey: 'id',
			// 	accessorFn: (row) => row.id,
			// 	header: ({ table }) => {
			// 		return (
			// 			<Group spacing={12} noWrap>
			// 				<Checkbox
			// 					size='xs'
			// 					checked={table.getIsAllRowsSelected()}
			// 					indeterminate={table.getIsSomeRowsSelected()}
			// 					onChange={(e) => {
			// 						table.getToggleAllRowsSelectedHandler()(e);
			// 					}}
			// 				/>

			// 				{/* <TableTextBox>Product ID</TableTextBox> */}
			// 			</Group>
			// 		);
			// 	},
			// 	cell: ({ row }) => (
			// 		<Flex align='center' gap={12}>
			// 			<Checkbox
			// 				size='xs'
			// 				{...{
			// 					checked: row.getIsSelected(),
			// 					disabled: !row.getCanSelect(),
			// 					indeterminate: row.getIsSomeSelected(),
			// 					onClick: (e) => e.stopPropagation(),
			// 				}}
			// 				onChange={(e) => {
			// 					row.getToggleSelectedHandler()(e);
			// 				}}
			// 			/>

			// 			{/* <TableTextBox>{getValue() as ReactNode}</TableTextBox> */}
			// 		</Flex>
			// 	),
			// },
			{
				id: 'parcel_name',
				accessorFn: (row) => row.name,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Parcel Name</TableTextBox>,
			},
			{
				id: 'description',
				accessorFn: (row) => row.description,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Description</TableTextBox>,
			},
			{
				id: 'sender_name',
				accessorFn: (row) => row.sender.name,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Sender Name</TableTextBox>,
			},
			{
				id: 'sender_ph_number',
				accessorFn: (row) => row.sender.phone_number,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Sender Phone</TableTextBox>,
			},
			{
				id: 'receiver_name',
				accessorFn: (row) => row.receiver.name,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Receiver Name</TableTextBox>,
			},
			{
				id: 'receiver_ph_number',
				accessorFn: (row) => row.receiver.phone_number,
				cell: (info) => info.getValue(),
				header: () => <TableTextBox>Receiver Phone</TableTextBox>,
			},
			// {
			// 	id: 'price',
			// 	accessorFn: (row) => row.price,
			// 	cell: (info) => info.getValue(),
			// 	header: () => <TableTextBox>Price</TableTextBox>,
			// },
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
		],
		[],
	);

	let columns;

	if (tabType === 'parcels') {
		const acceptIcon: ColumnDef<ParcelResponse>[] = [
			{
				accessorKey: 'id',
				header: 'Accept',
				accessorFn: (row) => row.accept_picked_up,
				cell: ({ getValue }) =>
					getValue() ? (
						<IconCircleCheckFilled style={{ color: 'green' }} />
					) : (
						<IconCircleCheck style={{ color: 'gray' }} />
					),
			},
		];

		columns = [...defaultColumns, ...acceptIcon];
	} else if (tabType === 'warehouse') {
		const acceptIcon: ColumnDef<ParcelResponse>[] = [
			{
				accessorKey: 'id',
				header: 'Accept',
				accessorFn: (row) => row.accept_deliver,
				cell: ({ getValue }) =>
					getValue() ? (
						<IconCircleCheckFilled style={{ color: 'green' }} />
					) : (
						<IconCircleCheck style={{ color: 'gray' }} />
					),
			},
		];

		columns = [...defaultColumns, ...acceptIcon];
	} else if (tabType === 'finish') {
		const deleteButton: ColumnDef<ParcelResponse>[] = [
			{
				accessorKey: 'action_id',
				header: () => <TableTextBox w={50}>Action</TableTextBox>,
				accessorFn: (row) => row.id,
				cell: ({ getValue }) => (
					<Menu withinPortal shadow='md' width={150}>
						<Menu.Target>
							<ActionIcon radius={'xl'}>
								<IconDotsVertical />
							</ActionIcon>
						</Menu.Target>

						<Menu.Dropdown>
							<Menu.Item
								icon={<IconTrash size={14} />}
								onClick={(e) => {
									e.stopPropagation();
									deleteHandler?.(getValue() as string);
								}}
							>
								Delete
							</Menu.Item>
						</Menu.Dropdown>
					</Menu>
				),
			},
		];

		columns = [...defaultColumns, ...deleteButton];
	} else {
		columns = [...defaultColumns];
	}

	return (
		<Box pr={20}>
			<Table
				data={data}
				columns={columns}
				autoColumnWidth
				withBorder
				disabledRowClickDetail
				onSelectedRowsChange={getSelectedRows}
			/>
		</Box>
	);
};
