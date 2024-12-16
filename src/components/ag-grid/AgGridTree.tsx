import React from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// AG Grid 모듈 가져오기
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";

// 필요한 모듈 등록
ModuleRegistry.registerModules([AllCommunityModule]);

type TreeData = {
	orgUnit: string;
	revenue: number;
	employees: number;
	children?: TreeData[];
};

const AgGridTree = () => {
	const rowData: TreeData[] = [
		{
			orgUnit: "Head Office",
			revenue: 0,
			employees: 0,
			children: [
				{
					orgUnit: "Engineering",
					revenue: 0,
					employees: 0,
					children: [
						{ orgUnit: "Frontend", revenue: 150000, employees: 2 },
						{ orgUnit: "Backend", revenue: 150000, employees: 3 },
					],
				},
				{
					orgUnit: "HR",
					revenue: 0,
					employees: 0,
					children: [
						{ orgUnit: "Recruitment", revenue: 100000, employees: 2 },
						{ orgUnit: "Training", revenue: 100000, employees: 1 },
					],
				},
			],
		},
	];
	
	const columnDefs: ColDef<TreeData>[] = [
		{
			field: "orgUnit",
			headerName: "Organization Unit",
			cellRenderer: "agGroupCellRenderer",
		},
		{
			field: "revenue",
			headerName: "Revenue",
			valueFormatter: ({ value }: { value: number }) =>
				value ? `$${value.toLocaleString()}` : "$0",
			aggFunc: "sum",
		},
		{
			field: "employees",
			headerName: "Employees",
			aggFunc: "sum",
		},
	];
	
	return (
		<div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				treeData={true} // 트리 데이터 활성화
				animateRows={true}
				autoGroupColumnDef={{
					headerName: "Group",
					cellRendererParams: {
						footerValueGetter: (params: any) =>
							`Total ${params.column.getColDef().headerName}: ${params.value}`,
					},
				}}
				getDataPath={(data: TreeData) => {
					return data.orgUnit.split(" > ");
				}}
				defaultColDef={{
					flex: 1,
					resizable: true,
					sortable: true,
				}}
			/>
		</div>
	);
};

export default AgGridTree;
