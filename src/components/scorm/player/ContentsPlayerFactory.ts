// scorm/ScormApiFactory.ts
import { Scorm12Api } from "./Scorm12Api";
import { Scorm2004Api } from "./Scorm2004Api";
import { ContentsPlayerApi } from "./ContentsPlayerApi";

export class ContentsPlayerFactory {
	static create(iframeWindow: Window): ContentsPlayerApi | null {
		try {
			console.log('factory => iframeWindow.AP => ', iframeWindow.API)
			if (iframeWindow.API) {
				console.log("SCORM 1.2 API detected");
				return new Scorm12Api(iframeWindow.API);
			} else if (iframeWindow.API_1484_11) {
				console.log("SCORM 2004 API detected");
				return new Scorm2004Api(iframeWindow.API_1484_11);
			} else {
				console.error("No SCORM API detected");
				return null;
			}
		}catch (e: any) {
			console.error(e);
			return null;
		}
	}
}
