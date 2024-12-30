/*@ts-ignore*/
import KiaScormPlayer from "../../components/scorm/KiaScormPlayer";

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
		<KiaScormPlayer/>
		{/* iframe 방식 */}
		
		{/* 팝업 방식 */}
	</div>
}
export default Scorm;