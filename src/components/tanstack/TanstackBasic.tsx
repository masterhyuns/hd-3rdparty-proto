import {createColumnHelper, flexRender, getCoreRowModel, useReactTable} from "@tanstack/react-table";
import React from "react";
import { CSSProperties } from "react";
import ClipLoader from "react-spinners/CircleLoader";
import './styles.css'
type Person = {
	firstName: string
	lastName: string
	age: number
	visits: number
	status: string
	progress: number
}

const defaultData: Person[] = [
	{
		firstName: 'tanner',
		lastName: 'linsley',
		age: 24,
		visits: 100,
		status: 'In Relationship',
		progress: 50,
	},
	{
		firstName: 'tandy',
		lastName: 'miller',
		age: 40,
		visits: 40,
		status: 'Single',
		progress: 80,
	},
	{
		firstName: 'joe',
		lastName: 'dirte',
		age: 45,
		visits: 20,
		status: 'Complicated',
		progress: 10,
	},


]

const override: CSSProperties = {
	display: "block",
	margin: "0 auto",
	borderColor: "red",
};


const columnHelper = createColumnHelper<Person>()

const columns = [
	columnHelper.accessor('firstName', {
		cell: info => info.getValue(),
		footer: info => info.column.id,
	}),
	columnHelper.accessor(row => row.lastName, {
		id: 'lastName',
		cell: info => <i>{info.getValue()}</i>,
		header: () => <span>Last Name</span>,
		footer: info => info.column.id,
	}),
	columnHelper.accessor('age', {
		header: () => 'Age',
		cell: info => info.renderValue(),
		footer: info => info.column.id,
	}),
	columnHelper.accessor('visits', {
		header: () => <span>Visits</span>,
		footer: info => info.column.id,
	}),
	columnHelper.accessor('status', {
		header: 'Status',
		footer: info => info.column.id,
	}),
	columnHelper.accessor('progress', {
		header: 'Profile Progress',
		footer: info => info.column.id,
	}),
]

const TanstackBasic = () => {
	const [data, _setData] = React.useState(() => [...defaultData])
	const rerender = React.useReducer(() => ({}), {})[1]
	let [loading, setLoading] = React.useState(true);
	let [color, setColor] = React.useState("#ffffff");
	
	
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	})
	
	const handleLoading = () => {
		setLoading(!loading)
	}
	
	return (
		<div className="p-2">
			<div  style={{position:'relative'}}>
				{loading && <>
					<div style={{
						position: 'absolute',
						zIndex: 100,
						backgroundColor: 'rgba(0,0,0,0.5)',
						width: '100%',
						height: '100%',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
						<ClipLoader
							color={color}
							loading={true}
							cssOverride={override}
							size={150}
							aria-label="Loading Spinner"
							data-testid="loader"
						/>
					</div>
				</>}
				<table>
					<thead>
					{table.getHeaderGroups().map(headerGroup => (
						<tr key={headerGroup.id}>
							{headerGroup.headers.map(header => (
								<th key={header.id}>
									{header.isPlaceholder
										? null
										: flexRender(
											header.column.columnDef.header,
											header.getContext()
										)}
								</th>
							))}
						</tr>
					))}
					</thead>
					<tbody>
					{table.getRowModel().rows.map(row => (
						<tr key={row.id}>
							{row.getVisibleCells().map(cell => (
								<td key={cell.id}>
									{flexRender(cell.column.columnDef.cell, cell.getContext())}
								</td>
							))}
						</tr>
					))}
					</tbody>
				</table>
				<div className="h-4"/>
			</div>
			<button onClick={handleLoading} className="border p-2">
				Loading
			</button>
		</div>
	);
};

export default TanstackBasic;
