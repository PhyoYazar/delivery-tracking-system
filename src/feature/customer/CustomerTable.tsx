import { Box, Button, Checkbox, Flex, Group, Text } from '@mantine/core';
import { type ColumnDef } from '@tanstack/table-core';
import { useMemo, type ReactNode } from 'react';
import { Table } from '../common/Table';

type Person = {
	id: string;
	firstName: string;
	lastName: string;
	age: number;
	visits: number;
	status: string;
	progress: number;
	isMarried: string;
	bd: string;
	town: string;
	city: string;
};

const defaultData: Person[] = [
	{
		id: '1',
		firstName: 'tanner',
		lastName: 'linsley',
		age: 24,
		visits: 100,
		status: 'In Relationship',
		progress: 50,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '2',
		firstName: 'joe',
		lastName: 'dirte',
		age: 45,
		visits: 20,
		status: 'Complicated',
		progress: 10,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '3',
		firstName: 'aoe',
		lastName: 'hirte',
		age: 45,
		visits: 20,
		status: 'Complicated',
		progress: 10,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '4',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '4',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '4',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '4',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '4',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '4',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
	{
		id: '4',
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,

		isMarried: 'No',
		bd: '20.3.1998',
		town: 'hledan',
		city: 'yangon',
	},
];
export const CustomerTable = () => {
	const defaultColumns: ColumnDef<Person>[] = useMemo(
		() => [
			{
				// TODO: checkbox accessorKey should be "id"
				accessorKey: 'firstName',
				accessorFn: (row) => row.firstName,
				header: ({ table }) => {
					return (
						<Group spacing={12}>
							<Checkbox
								size='xs'
								checked={table.getIsAllRowsSelected()}
								indeterminate={table.getIsSomeRowsSelected()}
								onChange={(e) => {
									table.getToggleAllRowsSelectedHandler()(e);
								}}
							/>

							<Text mt={4}>First Name</Text>
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

						<span>{getValue() as ReactNode}</span>
					</Flex>
				),
			},
			{
				id: 'lastName',
				accessorFn: (row) => row.lastName,
				cell: (info) => info.getValue(),
				header: () => <Box w={200}>Last Name</Box>,
			},
			{
				accessorKey: 'age',
				header: () => 'Age',
			},
			{
				accessorKey: 'visits',
				header: () => <span>Visits</span>,
			},
			{
				accessorKey: 'status',
				header: 'Status',
			},
			{
				accessorKey: 'progress',
				header: () => <Box w={200}>Profile Progress</Box>,
			},
			{
				accessorKey: 'isMarried',
				header: 'Married',
			},
			{
				accessorKey: 'bd',
				header: 'Birthday',
			},
			{
				accessorKey: 'town',
				header: 'Town',
			},
			{
				accessorKey: 'city',
				header: 'City',
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
		<Table
			data={defaultData}
			columns={defaultColumns}
			withBorder
			disabledRowClickDetail
		/>
	);
};
