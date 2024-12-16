import React from "react";
import {
	createColumnHelper,
	useReactTable,
	flexRender,
	getCoreRowModel,
	getExpandedRowModel,
} from "@tanstack/react-table";

type TreeData = {
	orgUnit: string;
	revenue: number;
	employees: number;
	subRows?: TreeData[]; // 하위 트리 데이터
};

// 샘플 데이터
const data: TreeData[] = [
	{
		orgUnit: "Head Office",
		revenue: 500000,
		employees: 10,
		subRows: [
			{
				orgUnit: "Engineering",
				revenue: 300000,
				employees: 5,
				subRows: [
					{ orgUnit: "Frontend", revenue: 150000, employees: 2 },
					{ orgUnit: "Backend", revenue: 150000, employees: 3 },
				],
			},
			{
				orgUnit: "HR",
				revenue: 200000,
				employees: 3,
				subRows: [
					{ orgUnit: "Recruitment", revenue: 100000, employees: 2 },
					{ orgUnit: "Training", revenue: 100000, employees: 1 },
				],
			},
		],
	},
];

// 컬럼 정의
const columnHelper = createColumnHelper<TreeData>();

const columns = [
	columnHelper.accessor("orgUnit", {
		header: "Organization Unit",
		cell: ({ row, getValue }) => (
			<div
				style={{
					paddingLeft: `${row.depth * 20}px`, // 트리 깊이에 따라 들여쓰기
				}}
			>
				{row.getCanExpand() ? (
					<button
						onClick={row.getToggleExpandedHandler()}
						style={{
							cursor: "pointer",
							marginRight: "8px",
						}}
					>
						{row.getIsExpanded() ? "▼" : "▶"}
					</button>
				) : null}
				{getValue()}
			</div>
		),
	}),
	columnHelper.accessor("revenue", {
		header: "Revenue",
		cell: ({ getValue }) => `$${getValue()}`,
		footer: (props) =>
			`Total: $${props.table
				.getFilteredRowModel()
				.flatRows.reduce((sum, row) => sum + (row.original.revenue || 0), 0)}`,
	}),
	columnHelper.accessor("employees", {
		header: "Employees",
		cell: ({ getValue }) => getValue(),
		footer: (props) =>
			`Total: ${props.table
				.getFilteredRowModel()
				.flatRows.reduce((sum, row) => sum + (row.original.employees || 0), 0)}`,
	}),
];

const TanstackTree2 = () => {
	// TanStack Table 인스턴스 생성
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getExpandedRowModel: getExpandedRowModel(), // 확장 모델 설정
		getSubRows: (row) => row.subRows, // 하위 트리 데이터 지정
		initialState: {
			expanded: true, // 모든 트리 기본 확장
		},
	});
	
	return (
		<div>
			<table border={1} style={{ width: "100%", borderCollapse: "collapse" }}>
				<thead>
				{table.getHeaderGroups().map((headerGroup) => (
					<tr key={headerGroup.id}>
						{headerGroup.headers.map((header) => (
							<th key={header.id}>
								{flexRender(header.column.columnDef.header, header.getContext())}
							</th>
						))}
					</tr>
				))}
				</thead>
				<tbody>
				{table.getRowModel().rows.map((row) => (
					<tr key={row.id}>
						{row.getVisibleCells().map((cell) => (
							<td key={cell.id}>
								{flexRender(cell.column.columnDef.cell, cell.getContext())}
							</td>
						))}
					</tr>
				))}
				</tbody>
				<tfoot>
				{table.getFooterGroups().map((footerGroup) => (
					<tr key={footerGroup.id}>
						{footerGroup.headers.map((header) => (
							<td key={header.id}>
								{flexRender(header.column.columnDef.footer, header.getContext())}
							</td>
						))}
					</tr>
				))}
				</tfoot>
			</table>
		</div>
	);
};

export default TanstackTree2;
