import React, { useState } from "react";
/*@ts-ignore*/
import { withScorm } from "react-scorm-provider";

const Question = (props:any) => {
	const [result, setResult] = useState("");
	
	const handleButtonClick = () => {
		console.log(props)
		console.log(props.sco.set("cmi.objectives._count", 1))
		const interactionTime = props.sco.get("cmi.objectives._count");
		console.log(interactionTime);
		setResult(interactionTime);
	};
	
	return (
		<div>
			<iframe
				src="https://louuu03.github.io/Scorm_Example/story.html"
				height="600px"
				width="900px"
				title="SCORM Content"
			/>
			<br/>
			<button onClick={handleButtonClick}>Click Me</button>
			<br/>
			<p>Result: {result}</p>
			
			<p>Welcome, {props.sco.learnerName}!</p>
			<p>Your course status is currently: {props.sco.completionStatus}</p>
			<p>Click the button below to complete the course!</p>
			<button onClick={() => props.sco.setStatus('completed')}>Mark me complete!</button>
		</div>
	);
};

export default withScorm()(Question);
