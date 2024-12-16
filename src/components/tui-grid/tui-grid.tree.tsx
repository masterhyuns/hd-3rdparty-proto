import React, {useState, useEffect, useRef} from 'react';
import TuiGrid from '@toast-ui/react-grid';


const treeData = [
	{
		name: 'Parent 1',
		value: 100,
		_children: [
			{ name: 'Child 1-1', value: 50 },
			{ name: 'Child 1-2', value: 30 },
		],
	},
	{
		name: 'Parent 2',
		value: 200,
		_children: [
			{ name: 'Child 2-1', value: 100 },
			{ name: 'Child 2-2', value: 50 },
			{ name: 'Child 2-3', value: 30 },
		],
	},
];


const TuiGridTree = () => {
	const [gridData, setGridData] = useState(treeData);
	const gridRef = useRef(null);
	// Summary 계산 함수
	const calculateSummary = (node:any) => {
		if (node._children) {
			const total = node._children.reduce((sum:any, child:any) => {
				return sum + (child.value || 0);
			}, 0);
			node.summary = total;
		}
	};
	
	// 모든 노드에 대해 Summary 계산
	const updateParentSummary = (data:any) => {
		data.forEach((node:any) => {
			calculateSummary(node);
			if (node._children) {
				updateParentSummary(node._children);
			}
		});
	};
	
	// 트리 데이터 초기화
	useEffect(() => {
		if (gridRef.current) {
			const updatedData = [...treeData];
			updateParentSummary(updatedData);
			setGridData(updatedData);
		}
		
	}, []);
	
	// 컬럼 정의
	const columns = [
		{
			name: 'name',
			header: 'Name',
			treeColumnOptions: { name: 'name', useIcon: true }, // 트리 설정
		},
		{ name: 'value', header: 'Value' },
		{ name: 'summary', header: 'Summary' },
	];
	
	return (
		/*@ts-ignore*/
		<div style={{height: '100%'}} ref={gridRef}>
			<TuiGrid
				data={gridData}
				columns={columns}
				rowHeight={40}
				bodyHeight="fitToParent"
				treeColumnOptions={{
					name: 'name',
					useIcon: true,
				}}
				/*@ts-ignore*/
				onExpand={(ev: any) => {
					const {rowKey} = ev;
					const node = gridData[rowKey];
					calculateSummary(node);
					setGridData([...gridData]);
				}}
				onCollapse={(ev: any) => {
					const {rowKey} = ev;
					const node = gridData[rowKey];
					calculateSummary(node);
					setGridData([...gridData]);
				}}
			/>
		</div>
			);
			};
			
			export default TuiGridTree;

