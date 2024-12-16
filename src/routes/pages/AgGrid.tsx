import React from "react";
import AgGridBasic from "../../components/ag-grid/AgGridBasic";
import AgGridEditing from "../../components/ag-grid/AgGridEditing";
import TusMultiStatus from "../../components/uploader/TusMultiStatus";

const AgGrid = () => {
	return (
		<>
			<TusMultiStatus/>
			<p><h2>1. 기본 테이블</h2></p>
			<AgGridBasic/>
			<p><h2>2. 그룹핑</h2></p>
			<p><h2>3. 트리</h2></p>
			<p><h2>4. 에디팅</h2></p>
			<AgGridEditing/>
			<p><h2>6. 고정</h2></p>
			<p><h2>7. DND</h2></p>
		</>
	);
};

export default AgGrid;
