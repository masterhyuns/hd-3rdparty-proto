import React, { useRef, useEffect } from "react";
const PostMessageScormPlayer = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	
	useEffect(() => {
		// Listen for messages from the SCORM iframe
		const handleMessage = (event: MessageEvent) => {
			if (event.origin === "https://cloud.scorm.com") {
				console.log("Message from SCORM Content:", event.data);
				
				// Handle the response from SCORM content
				if (event.data.type === "scormResponse") {
					console.log(`SCORM API Response: ${event.data.result}`);
				}
			}
		};
		
		window.addEventListener("message", handleMessage);
		
		return () => {
			window.removeEventListener("message", handleMessage);
		};
	}, []);
	
	const callScormApi = (method: string, ...params: any[]) => {
		if (iframeRef.current && iframeRef.current.contentWindow) {
			console.log('call ??')
			// Send a message to the SCORM iframe
			iframeRef.current.contentWindow.postMessage(
				{
					type: "scormApiCall",
					method, // SCORM API method (e.g., "LMSInitialize")
					params, // Parameters for the method
				},
				"https://cloud.scorm.com"
			);
		}
	};
	
	const initializeScorm = () => {
		callScormApi("LMSInitialize", "");
	};
	
	const setScormValue = () => {
		callScormApi("LMSSetValue", "cmi.core.score.raw", "95");
	};
	
	return (
		<div>
			<h1>SCORM Player</h1>
			<iframe
				ref={iframeRef}
				src="https://app.cloud.scorm.com/sc/InvitationConfirmEmail?publicInvitationId=d6c47ba2-b441-42c3-a855-05b450d7c353"
				style={{ width: "100%", height: "600px", border: "none" }}
				title="SCORM Content"
			/>
			<button onClick={initializeScorm}>Initialize SCORM</button>
			<button onClick={setScormValue}>Set SCORM Value</button>
		</div>
	);
};

export default PostMessageScormPlayer;
