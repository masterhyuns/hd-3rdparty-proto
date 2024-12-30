import React, { useEffect, useRef } from "react";
import useContentsPlayer from "./player/useContentsPlayer";
import {Simulate} from "react-dom/test-utils";

const ScormPlayer: React.FC = () => {
	/*const {ref, player} = useContentsPlayer()*/
	const ref = useRef<HTMLIFrameElement>(null);
	
	// 예제: LMSInitialize 호출
	const initializeScorm = () => {
		if(ref.current){
				const iframeWindow = ref.current.contentWindow;
				console.log(iframeWindow)
				if (iframeWindow) {
					/*@ts-ignore*/
					if ( iframeWindow.API){
						/*@ts-ignore*/
						console.log(iframeWindow.API.LMSInitialize(""))
						/*@ts-ignore*/
						alert(iframeWindow.API.LMSGetValue("cmi.core.student_id"));
					}else{
						console.error("not connected")
					}
				}
		}
	};
	// 예제: LMSGetValue 호출
	const setScormValue = () => {
		console.log(ref.current)
		if(ref.current){
			const iframeWindow = ref.current.contentWindow;
			console.log(iframeWindow)
			if (iframeWindow) {
				/*@ts-ignore*/
				if ( iframeWindow.API){
					/*@ts-ignore*/
					iframeWindow.API.LMSSetValue("cmi.core.exit", "suspend")
					/*@ts-ignore*/
					iframeWindow.API.LMSCommit(""); // 데이터 즉시 커밋
				}else{
					console.error("not connected")
				}
			}
		}
	};
	
	// 예제: LMSGetValue 호출
	const getScormValue = () => {
		console.log(ref.current)
		if(ref.current){
			const iframeWindow = ref.current.contentWindow;
			console.log(iframeWindow)
			if (iframeWindow) {
				/*@ts-ignore*/
				if ( iframeWindow.API){
					alert(iframeWindow.API.LMSGetValue("cmi.core.lesson_status"));
				}else{
					console.error("not connected")
				}
			}
		}
	};
	
	return (
		<div>
			<h2>SCORM Player (Iframe with Communication)</h2>
			<iframe
				ref={ref}
				src="https://app.cloud.scorm.com/sc/InvitationConfirmEmail?publicInvitationId=546e01f6-7849-40bf-8ac0-b4fc832309c7"
				style={{ width: "100%", height: "600px", border: "none" }}
				title="SCORM Player"
			/>
			<button onClick={initializeScorm}>Initialize SCORM</button>
			<button onClick={setScormValue}>Set SCORM Complete!!</button>
			<button onClick={getScormValue}>getScormValue</button>
		</div>
	);
};

export default ScormPlayer;
