/*@ts-ignore*/
import ScormPlayer from "../../components/scorm/ScormPlayer";
import ScormPopup from "../../components/scorm/ScormPopup";

const Scorm = () => {
	/*return <ScormProvider version="1.2" debug={true}>
		<div className="App">
			<h1>Quiz</h1>
			<hr />
			<ScormPlayer />
		</div>
	</ScormProvider>*/
	//return <ScormViewer/>
	//return <PostMessageScormPlayer/>
	return <div>
		<h1>SCORM Integration Example</h1>
		<p>Choose a method to launch the SCORM content:</p>
		
		{/* iframe 방식 */}
		<ScormPlayer/>
		
		{/* 팝업 방식 */}
		<ScormPopup/>
	</div>
}
export default Scorm;