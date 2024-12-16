import {Link} from "react-router-dom";
import React from "react";
import TusMultiUploder from "../../components/uploader/TusMultiUploder";
import TusMultiStatus from "../../components/uploader/TusMultiStatus";
import DndUpload from "../../components/uploader/DnDUpload";
import LexicalEditor from "../../components/editor/lexical";

const Home = () => {
	return (
		<div>
			<TusMultiStatus/>
			<h1>
				<Link to={'/tanstack'}>Tanstack Grid</Link></h1>
			<h1><Link to={'/aggrid'}>AG Grid</Link></h1>
			<h1><Link to={'/realgrid'}>Real Grid</Link></h1>
			<h1><Link to={'/tuigrid'}>Tui Grid</Link></h1>
			<h1><Link to={'/lexical'}>Lexical</Link></h1>
			<h1>Multi Upload</h1>
			<TusMultiUploder/>
			<h1>DnD Upload</h1>
			<DndUpload/>
			
		</div>
	
	);
};

export default Home;
