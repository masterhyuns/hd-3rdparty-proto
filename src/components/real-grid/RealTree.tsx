import {useEffect, useRef} from "react";
import {GridView, LocalDataProvider} from "realgrid";
import {columns, fields, rows} from "./tree-data";

const MyComponent = () => {
	const realgridElement = useRef(null);
	
	useEffect(() => {
		const container = realgridElement.current;
		const provider = new LocalDataProvider(true);
		let grid:any = null ;
		if ( container ){
			grid = new GridView(container);
			grid.setDataSource(provider);
			// @ts-ignore
			provider.setFields(fields);
			grid.setColumns(columns);
			provider.setRows(rows);
			
			grid.groupPanel.visible = true;
			grid.groupBy(["KorCountry"]);
			grid.setRowGroup({mergeMode:true, expandedAdornments: "footer", collapsedAdornments: "footer"});
			
			
		}
		return () => {
			provider.clearRows();
			if (grid){
				grid.destroy();
			}
			provider.destroy();
		};
	}, []);
	
	return <div ref={realgridElement} style={{ height: "400px", width: "100%" }}></div>;
};

export default MyComponent;
