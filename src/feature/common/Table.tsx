import { Box, Table as MantineTable, ScrollArea } from '@mantine/core';
import {
	flexRender,
	getCoreRowModel,
	useReactTable,
	type ColumnDef,
	type RowSelectionState,
} from '@tanstack/react-table';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// type ExtractId<D> = D & { id: string | number};

interface ITableProps<D> {
	/** Table header columns name */
	columns: ColumnDef<D>[];
	// columns: (
	// 	createHelper: typeof createColumnHelper<D>,
	// ) => Array<ColumnDef<D, any>>;

	/** Table body data */
	data: Array<D>;

	/** Add border to table */
	withBorder?: boolean;

	/**
	 *  table column auto width
	 *	only use autoColumnWidth when table width need to be 100%
	 */

	autoColumnWidth?: boolean;

	/** if you use both 'autoColumnWidth' and 'width', width will overwrite... */
	/** table container width */
	containerWidth?: number | string;

	/** table continer height */
	containerHeight?: number | string;

	/** disable to go detail route when clicking row */
	disabledRowClickDetail?: boolean;

	/**  */
	onRowClick?: (val: string) => void;

	onSelectedRowsChange?: (val: D[]) => void;
}

export function Table<D>({
	data,
	columns,
	withBorder = false,
	containerWidth = '99.9%',
	containerHeight,
	autoColumnWidth = false,
	disabledRowClickDetail = false,
	onRowClick,
	onSelectedRowsChange,
}: ITableProps<D>) {
	const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
	const router = useRouter();

	const [defaultData, setDefaultData] = useState(data);
	const [defaultColumns] = useState<typeof columns>(() => [...columns]);

	const table = useReactTable({
		data: defaultData,
		columns: defaultColumns,
		state: {
			rowSelection,
		},
		onRowSelectionChange: setRowSelection,
		columnResizeMode: 'onChange',
		getCoreRowModel: getCoreRowModel(),
		debugTable: true,
		debugHeaders: true,
		debugColumns: true,
	});

	useEffect(() => {
		onSelectedRowsChange?.(
			table.getSelectedRowModel().flatRows.map((row) => row.original),
		);
	}, [rowSelection, table, onSelectedRowsChange]);

	useEffect(() => {
		setDefaultData(data);
	}, [data]);

	return (
		<Box
			component={ScrollArea}
			type='always'
			offsetScrollbars
			styles={(theme) => ({
				scrollbar: {
					'zIndex': 10,

					'&[data-orientation="horizontal"] .k-link-ScrollArea-thumb, &[data-orientation="vertical"] .k-link-ScrollArea-thumb':
						{
							backgroundColor: theme.colors.blue[8],
						},
				},
			})}
			sx={(theme) => ({
				// width: 'calc(100% - 30px)',
				position: 'relative',
				width: containerWidth,
				height: containerHeight,
				overflow: 'hidden',
				borderRadius: withBorder ? theme.radius.md : undefined,
				border: withBorder ? `1px solid ${theme.colors.gray[3]}` : undefined,
				backgroundColor: theme.white,
				boxShadow: theme.shadows.md,
			})}
		>
			<MantineTable
				highlightOnHover
				{...{
					style: {
						width: autoColumnWidth ? '100%' : table.getCenterTotalSize(),
					},
				}}
			>
				<thead>
					{table.getHeaderGroups().map((headerGroup) => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map((header) => (
								<th
									key={header.id}
									colSpan={header.colSpan}
									style={{
										width: header.getSize(),
									}}
								>
									{header.isPlaceholder
										? null
										: flexRender(
												header.column.columnDef.header,
												header.getContext(),
										  )}
									<Box
										component='div'
										onMouseDown={header.getResizeHandler()}
										onTouchStart={header.getResizeHandler()}
									/>
								</th>
							))}
						</tr>
					))}
				</thead>

				<tbody>
					{table.getRowModel().rows.map((row) => (
						<Box
							component='tr'
							key={row.id}
							sx={{ cursor: disabledRowClickDetail ? undefined : 'pointer' }}
							onClick={(): void => {
								const original = row.original as D extends { id: string }
									? D
									: never;
								if (!disabledRowClickDetail) {
									void router.push(`${router.pathname}/${original.id}`);
								}

								onRowClick?.(original.id);
							}}
						>
							{row.getVisibleCells().map((cell) => (
								<td
									key={cell.id}
									style={{
										width: cell.column.getSize(),
									}}
								>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</Box>
					))}
				</tbody>
			</MantineTable>
		</Box>
	);
}
