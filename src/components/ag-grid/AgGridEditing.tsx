import React, {useEffect, useState} from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { faker } from '@faker-js/faker'
type RowData = {
	name: string;
	age: number;
	firstName: string;
	lastName: string;
	email: string;
	street: string;
	city: string;
	zipCode: string;
	phoneNumber: string;
	website: string;
	company: string;
};

const tempRowData: RowData[] = []
for(let i = 0; i < 30000; i++){
	tempRowData.push({
		name: faker.string.uuid(),
		age: faker.number.int(),
		firstName: faker.string.uuid(),
		lastName: faker.string.uuid(),
		email: faker.string.uuid(),
		street: faker.string.uuid(),
		city: faker.string.uuid(),
		zipCode: faker.string.uuid(),
		phoneNumber: faker.string.uuid(),
		website: faker.string.uuid(),
		company:faker.string.uuid(),
	})
}

const AgGridEditing = () => {
	const [rowData, setRowData] = useState<RowData[]>(tempRowData)
	// 컬럼 정의
	const columnDefs: ColDef<RowData>[] = [
		{
			field: "name",
			headerName: "Name",
			cellRenderer: (params:any) => {
				// 항상 노출되는 Input 박스
				return (
					<input
						value={params.value}
						onChange={(e) =>
							params.api.getRowNode(params.node.id!)?.setDataValue("name", e.target.value)
						}
						style={{ width: "100%" }}
					/>
				);
			},
		},
		{
			field: "age",
			headerName: "Age",
			cellRenderer: (params:any) => {
				// 숫자 입력 필드
				return (
					<input
						type="number"
						value={params.value}
						onChange={(e) =>
							params.api.getRowNode(params.node.id!)?.setDataValue("age", parseInt(e.target.value))
						}
						style={{ width: "100%" }}
					/>
				);
			},
		},
		{
			field: "firstName",
			headerName: "firstName",
			cellRenderer: (params:any) => {
				// 숫자 입력 필드
				return (
					<select onChange={(e) =>
						params.api.getRowNode(params.node.id!)?.setDataValue("firstName", parseInt(e.target.value))
					} value={params.value} 	style={{ width: "100%" }}>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
					</select>
				);
			},
		},
		{
			field: "lastName",
			headerName: "lastName",
			cellRenderer: (params:any) => {
				// 숫자 입력 필드
				return (
					<select onChange={(e) =>
						params.api.getRowNode(params.node.id!)?.setDataValue("lastName", parseInt(e.target.value))
					} value={params.value} style={{width: "100%"}}>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
					</select>
				);
			},
		},
		{
			field: "email",
			headerName: "email",
			cellRenderer: (params: any) => {
				// 숫자 입력 필드
				return (
					<input
						type="checkbox"
						value={params.value}
						onChange={(e) =>
							params.api.getRowNode(params.node.id!)?.setDataValue("email", parseInt(e.target.value))
						}
					/>
				);
			},
		},{
			field: "street",
			headerName: "street",
			cellRenderer: (params:any) => {
				// 숫자 입력 필드
				return (
					<input
						type="radio"
						value={params.value}
						onChange={(e) =>
							params.api.getRowNode(params.node.id!)?.setDataValue("street", parseInt(e.target.value))
						}
						style={{ width: "100%" }}
					/>
				);
			},
		},
		{
			field: "city",
			headerName: "city",
			cellRenderer: (params:any) => {
				// 숫자 입력 필드
				return (
					<input
						type="password"
						value={params.value}
						onChange={(e) =>
							params.api.getRowNode(params.node.id!)?.setDataValue("city", parseInt(e.target.value))
						}
						style={{ width: "100%" }}
					/>
				);
			},
		},
		{
			field: "zipCode",
			headerName: "zipCode",
			cellRenderer: (params:any) => {
				// 숫자 입력 필드
				return (
					<select onChange={(e) =>
						params.api.getRowNode(params.node.id!)?.setDataValue("zipCode", parseInt(e.target.value))
					} value={params.value} style={{width: "100%"}}>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
						<option value={''}>'선택'</option>
					</select>
				);
			},
		},
		{
			field: "phoneNumber",
			headerName: "phoneNumber",
			cellRenderer: (params: any) => {
				// 숫자 입력 필드
				return (
					<select onChange={(e) =>
						params.api.getRowNode(params.node.id!)?.setDataValue("phoneNumber", parseInt(e.target.value))
					} value={params.value} style={{width: "100%"}}>
						<option value={''}>'선택'</option>
						<option value={'1'}>'선택'</option>
						<option value={'2'}>'선택'</option>
						<option value={'3'}>'선택'</option>
					</select>
				);
			},
		},
		{
			field: "website",
			headerName: "website",
			cellRenderer: (params: any) => {
				// 숫자 입력 필드
				return (
					<input
						type="text"
						value={params.value}
						onChange={(e) =>
							params.api.getRowNode(params.node.id!)?.setDataValue("age", parseInt(e.target.value))
						}
						style={{width: "100%"}}
					/>
				);
			},
		},
	];

	return (
		<div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
			<AgGridReact
				rowData={rowData}
				columnDefs={columnDefs}
				defaultColDef={{
					flex: 1,
					resizable: true,
					sortable: true,
				}}
				animateRows={true}
			/>
		</div>
	);
};

export default AgGridEditing;
