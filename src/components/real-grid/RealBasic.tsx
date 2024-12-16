import { useEffect, useRef } from "react";
import { GridView, LocalDataProvider } from "realgrid";
import { columns, fields, rows } from "./basic-data";
import "realgrid/dist/realgrid-style.css"; //

const RealBasic = () => {
	const realgridElement = useRef(null);
	
	useEffect(() => {
		const container = realgridElement.current;
		const provider = new LocalDataProvider(true);
		// @ts-ignore
		const grid = new GridView(container);
		
		grid.setDataSource(provider);
		provider.setFields(fields);
		grid.setColumns(columns);
		provider.setRows(rows);
		
		return () => {
			provider.clearRows();
			grid.destroy();
			provider.destroy();
		};
	}, []);
	
	return <div ref={realgridElement} style={{ height: "200px", width: "80%" }}></div>;
};

export default RealBasic;
