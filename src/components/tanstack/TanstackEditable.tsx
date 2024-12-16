import React from 'react';
import ReactDOM from 'react-dom/client'

//
import './styles.css'

//
import {
	Column,
	Table,
	ColumnDef,
	useReactTable,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	flexRender,
	RowData,
} from '@tanstack/react-table'
import { makeData, Person } from './makeData'

declare module '@tanstack/react-table' {
	interface TableMeta<TData extends RowData> {
		updateData: (rowIndex: number, columnId: string, value: unknown) => void
	}
}

// Separate cell into its own component
// @ts-ignore
const EditableCell = ({ value: initialValue, rowIndex, columnId, updateData }) => {
	// State to keep track of the current cell value
	const [value, setValue] = React.useState<string>(initialValue);
	
	// Sync state with external changes to initialValue
	React.useEffect(() => {
		setValue(initialValue);
	}, [initialValue]);
	
	const onBlur = () => {
		updateData(rowIndex, columnId, value);
	};
	if ( value.length < 5){
		return <select>
			<option value={'1'} selected>1</option>
			<option value={'2'} selected>2</option>
			<option value={'3'} selected>3</option>
			<option value={'4'} selected>4</option>
			<option value={'5'} selected>5</option>
		</select>
	}else{
		return (
			<input
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onBlur={onBlur}
			/>
		);
	}
	
};
// Default column definition
const defaultColumn: Partial<ColumnDef<Person>> = {
	cell: ({ getValue, row: { index }, column: { id }, table }) => {
		return (
			<EditableCell
				value={getValue()}
				rowIndex={index}
				columnId={id}
				updateData={table.options.meta?.updateData}
			/>
		);
	},
};

function useSkipper() {
	const shouldSkipRef = React.useRef(true)
	const shouldSkip = shouldSkipRef.current
	
	// Wrap a function with this to skip a pagination reset temporarily
	const skip = React.useCallback(() => {
		shouldSkipRef.current = false
	}, [])
	
	React.useEffect(() => {
		shouldSkipRef.current = true
	})
	
	return [shouldSkip, skip] as const
}

export default function TanstackEditable() {
	const rerender = React.useReducer(() => ({}), {})[1]
	
	const columns = React.useMemo<ColumnDef<Person>[]>(
		() => [
			{
				header: 'Name',
				footer: props => props.column.id,
				columns: [
					{
						accessorKey: 'firstName',
						footer: props => props.column.id,
					},
					{
						accessorFn: row => row.lastName,
						id: 'lastName',
						header: () => <span>Last Name</span>,
						footer: props => props.column.id,
					},
				],
			},
			{
				header: 'Info',
				footer: props => props.column.id,
				columns: [
					{
						accessorKey: 'age',
						header: () => 'Age',
						footer: props => props.column.id,
					},
					{
						header: 'More Info',
						columns: [
							{
								accessorKey: 'visits',
								header: () => <span>Visits</span>,
								footer: props => props.column.id,
							},
							{
								accessorKey: 'status',
								header: 'Status',
								footer: props => props.column.id,
							},
							{
								accessorKey: 'progress',
								header: 'Profile Progress',
								footer: props => props.column.id,
							},
						],
					},
				],
			},
		],
		[]
	)
	
	const [data, setData] = React.useState(() => makeData(1000))
	const refreshData = () => setData(() => makeData(1000))
	
	const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
	
	const table = useReactTable({
		data,
		columns,
		defaultColumn,
		getCoreRowModel: getCoreRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		autoResetPageIndex,
		// Provide our updateData function to our table meta
		meta: {
			updateData: (rowIndex, columnId, value) => {
				// Skip page index reset until after next rerender
				skipAutoResetPageIndex()
				setData(old =>
					old.map((row, index) => {
						if (index === rowIndex) {
							return {
								...old[rowIndex]!,
								[columnId]: value,
							}
						}
						return row
					})
				)
			},
		},
		debugTable: true,
	})
	
	return (
		<div className="p-2">
			<div className="h-2" />
			<table>
				<thead>
				{table.getHeaderGroups().map(headerGroup => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map(header => {
							return (
								<th key={header.id} colSpan={header.colSpan}>
									{header.isPlaceholder ? null : (
										<div>
											{flexRender(
												header.column.columnDef.header,
												header.getContext()
											)}
											{header.column.getCanFilter() ? (
												<div>
													<Filter column={header.column} table={table} />
												</div>
											) : null}
										</div>
									)}
								</th>
							)
						})}
					</tr>
				))}
				</thead>
				<tbody>
				{table.getRowModel().rows.map(row => {
					return (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => {
								return (
									<td key={cell.id}>
										{flexRender(
											cell.column.columnDef.cell,
											cell.getContext()
										)}
									</td>
								)
							})}
						</tr>
					)
				})}
				</tbody>
			</table>
			<div className="h-2" />
			<div className="flex items-center gap-2">
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(0)}
					disabled={!table.getCanPreviousPage()}
				>
					{'<<'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.previousPage()}
					disabled={!table.getCanPreviousPage()}
				>
					{'<'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.nextPage()}
					disabled={!table.getCanNextPage()}
				>
					{'>'}
				</button>
				<button
					className="border rounded p-1"
					onClick={() => table.setPageIndex(table.getPageCount() - 1)}
					disabled={!table.getCanNextPage()}
				>
					{'>>'}
				</button>
				<span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
	          {table.getPageCount()}
          </strong>
        </span>
				<span className="flex items-center gap-1">
          | Go to page:
          <input
	          type="number"
	          min="1"
	          max={table.getPageCount()}
	          defaultValue={table.getState().pagination.pageIndex + 1}
	          onChange={e => {
		          const page = e.target.value ? Number(e.target.value) - 1 : 0
		          table.setPageIndex(page)
	          }}
	          className="border p-1 rounded w-16"
          />
        </span>
				<select
					value={table.getState().pagination.pageSize}
					onChange={e => {
						table.setPageSize(Number(e.target.value))
					}}
				>
					{[10, 20, 30, 40, 50].map(pageSize => (
						<option key={pageSize} value={pageSize}>
							Show {pageSize}
						</option>
					))}
				</select>
			</div>
			<div>{table.getRowModel().rows.length} Rows</div>
			<div>
				<button onClick={() => rerender()}>Force Rerender</button>
			</div>
			<div>
				<button onClick={() => refreshData()}>Refresh Data</button>
			</div>
		</div>
	)
}
function Filter({
	                column,
	                table,
                }: {
	column: Column<any, any>
	table: Table<any>
}) {
	const firstValue = table
		.getPreFilteredRowModel()
		.flatRows[0]?.getValue(column.id)
	
	const columnFilterValue = column.getFilterValue()
	
	return typeof firstValue === 'number' ? (
		<div className="flex space-x-2">
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[0] ?? ''}
				onChange={e =>
					column.setFilterValue((old: [number, number]) => [
						e.target.value,
						old?.[1],
					])
				}
				placeholder={`Min`}
				className="w-24 border shadow rounded"
			/>
			<input
				type="number"
				value={(columnFilterValue as [number, number])?.[1] ?? ''}
				onChange={e =>
					column.setFilterValue((old: [number, number]) => [
						old?.[0],
						e.target.value,
					])
				}
				placeholder={`Max`}
				className="w-24 border shadow rounded"
			/>
		</div>
	) : (
		<input
			type="text"
			value={(columnFilterValue ?? '') as string}
			onChange={e => column.setFilterValue(e.target.value)}
			placeholder={`Search...`}
			className="w-36 border shadow rounded"
		/>
	)
}
