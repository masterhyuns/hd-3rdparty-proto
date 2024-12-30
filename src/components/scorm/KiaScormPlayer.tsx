import {useEffect, useState, useRef} from "react";

const KiaScormPlayer = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	const [loading, setLoading] = useState(false)
	useEffect(() => {
		// 부모 창에 SCORM API 정의
		(window as any).API_1484_11 = {
			Initialize: (param: string) => {
				console.log("SCORM Initialized with", param);
				return "true";
			},
			GetValue: (key: string) => {
				console.log(`GetValue called with key: ${key}`);
				return "value";
			},
			SetValue: (key: string, value: string) => {
				console.log(`SetValue called with key: ${key}, value: ${value}`);
				return "true";
			},
			Commit: (param: string) => {
				console.log("Commit called with", param);
				return "true";
			},
			Terminate: (param: string) => {
				console.log("Terminate called with", param);
				return "true";
			},
		};
		console.log("SCORM API initialized in parent");
		setLoading(true)
	}, []);
	return (
		<div>
			{loading && <iframe ref={iframeRef}
			         src={'https://kda.kia.com/gtaft/content/wbt/2024/1017/0001/585745/HKScorm/PackageImport/index_lms.html?deviceType=P'}
			         onLoad={() => {
				         console.log("iframe loaded");
				         if ((window as any).API_1484_11) {
					         console.log("SCORM API is ready");
				         } else {
					         console.error("SCORM API not found");
				         }
			         }}
			></iframe>}
		
		</div>
	);
};

export default KiaScormPlayer;
