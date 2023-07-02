import { Box, Button, Checkbox, Flex, Group, Stack, Text } from '@mantine/core';
import { type ColumnDef } from '@tanstack/table-core';
import { useMemo, type ReactNode } from 'react';
import { Table } from '~/feature/common/Table';

type Truck = {
	id: string;
	deliveryName: string;
	truckNo: string;
	startDate: string;
	phoneNumber: string;
	latestStatus: string;
};

const defaultData: Truck[] = [
	{
		id: '1',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '2',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '3',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '4',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '5',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '6',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '7',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '8',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
	{
		id: '9',
		deliveryName: 'Aung Kyaw Moe',
		truckNo: 'EH5032',
		startDate: '30/6/2023',
		phoneNumber: '09786543234',
		latestStatus: 'Kachin City',
	},
];

const FinishTrucksPage = () => {
	const defaultColumns: ColumnDef<Truck>[] = useMemo(
		() => [
			{
				accessorKey: 'deliveryName',
				accessorFn: (row) => row.deliveryName,
				header: ({ table }) => {
					return (
						<Box w={250}>
							<Group spacing={12} noWrap>
								<Checkbox
									size='xs'
									checked={table.getIsAllRowsSelected()}
									indeterminate={table.getIsSomeRowsSelected()}
									onChange={(e) => {
										table.getToggleAllRowsSelectedHandler()(e);
									}}
								/>

								<Text>Delivery Name</Text>
							</Group>
						</Box>
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

						<span>{getValue() as ReactNode}</span>
					</Flex>
				),
			},
			{
				id: 'truckNo',
				accessorFn: (row) => row.truckNo,
				cell: (info) => info.getValue(),
				header: () => <Box w={200}>Truck No</Box>,
			},
			{
				accessorKey: 'startDate',
				header: () => <Box w={180}>Start Date</Box>,
			},
			{
				accessorKey: 'phoneNumber',
				header: () => <Box w={180}>Phone Number</Box>,
			},
			{
				accessorKey: 'latestStatus',
				accessorFn: (row) => row.latestStatus,
				header: () => <Box w={180}>Status</Box>,
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
		<Stack>
			<Text>Finish Delivery Trucks</Text>

			<Table
				data={defaultData}
				columns={defaultColumns}
				withBorder
				disabledRowClickDetail
			/>
		</Stack>
	);
};

export default FinishTrucksPage;
