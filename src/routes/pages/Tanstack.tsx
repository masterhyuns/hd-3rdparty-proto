import React from "react";
import TanstackBasic from "../../components/tanstack/TanstackBasic";
import TanstackGroupping from "../../components/tanstack/TanstackGroupping";
import TanstackTree from "../../components/tanstack/TanstackTree";
import TanstackEditable from "../../components/tanstack/TanstackEditable";
import TanstackSticky from "../../components/tanstack/TanstackSticky";
import TanstackDnD from "../../components/tanstack/TanstackDnD";
import TanstackTree2 from "../../components/tanstack/TanstackTree2";
import TusMultiStatus from "../../components/uploader/TusMultiStatus";


const TanStack = () => {
	
	
	return (
		<>
			<TusMultiStatus/>
			<p><h2>1. 기본 테이블</h2></p>
			<TanstackBasic/>
			<p><h2>2. 그룹핑</h2></p>
			<TanstackGroupping/>
			<p><h2>3. 트리</h2></p>
			<TanstackTree/>
			<p><h2>4. 에디팅</h2></p>
			<TanstackEditable/>
			<p><h2>6. 고정</h2></p>
			<TanstackSticky/>
			<p><h2>7. DND</h2></p>
			<TanstackDnD/>
			<p><h2>8. 합계 트리</h2></p>
			<TanstackTree2/>
		</>
	);
};

export default TanStack;
