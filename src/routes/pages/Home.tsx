import {Link} from "react-router-dom";
import React from "react";
import TusMultiUploder from "../../components/uploader/TusMultiUploder";
import TusMultiStatus from "../../components/uploader/TusMultiStatus";
import DndUpload from "../../components/uploader/DnDUpload";
import Editor from "../../components/editor";
import ScormPlayer from "../../components/scorm/ScormPlayer";
import ScormPopup from "../../components/scorm/ScormPopup";

const Home = () => {
	return (
		<div>
			<TusMultiStatus/>
			<h1><Link to={'/tanstack'}>Tanstack Grid</Link></h1>
			<h1><Link to={'/aggrid'}>AG Grid</Link></h1>
			<h1><Link to={'/realgrid'}>Real Grid</Link></h1>
			<h1><Link to={'/tuigrid'}>Tui Grid</Link></h1>
			<h1><Link to={'/lexical'}>Lexical</Link></h1>
			<h1>Multi Upload</h1>
			<TusMultiUploder/>
			<h1>DnD Upload</h1>
			<DndUpload/>
			<h1>Editor</h1>
			<Editor/>
			<h1>SCORM Integration Example</h1>
			<p>Choose a method to launch the SCORM content:</p>
			
			{/* iframe 방식 */}
			<ScormPlayer/>
			
			{/* 팝업 방식 */}
			<ScormPopup/>
		</div>
	
	);
};

export default Home;
