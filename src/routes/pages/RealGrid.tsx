import TanstackBasic from "../../components/tanstack/TanstackBasic";
import RealBasic from "../../components/real-grid/RealBasic";
import RealTree from "../../components/real-grid/RealTree";
import TusMultiStatus from "../../components/uploader/TusMultiStatus";
import React from "react";

const RealGrid = () => {
	return (
		<div>
			<TusMultiStatus/>
			<p><h2>1. 기본 테이블</h2></p>
			<RealBasic/>
			
			<p><h2>2. 트리 테이블</h2></p>
			<RealTree/>
		</div>
	);
};

export default RealGrid;
