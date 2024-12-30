class ScormService {
	private iframeWindow: Window | null = null;
	
	setIframeWindow(window: Window | null) {
		this.iframeWindow = window;
	}
	
	private getAPI() {
		if (this.iframeWindow) {
			/*@ts-ignore*/
			console.log('this.iframeWindow.API => ', this.iframeWindow.API_1484_11)
			/*@ts-ignore*/
			const api = this.iframeWindow.API || this.iframeWindow.API_1484_11;
			if (api) {
				return api;
			}
		}
		console.error("SCORM API not found in iframe window.");
		return null;
	}
	
	initialize(): boolean {
		const api = this.getAPI();
		if (api) {
			return api.Initialize ? api.Initialize("") : api.LMSInitialize("");
		}
		return false;
	}
	
	terminate(): boolean {
		const api = this.getAPI();
		if (api) {
			return api.Terminate ? api.Terminate("") : api.LMSFinish("");
		}
		return false;
	}
	
	getValue(key: string): string | null {
		const api = this.getAPI();
		if (api) {
			const value = api.GetValue ? api.GetValue(key) : api.LMSGetValue(key);
			if (api.GetLastError() === "0") {
				return value;
			}
			console.error(`SCORM GetValue failed for key: ${key}`);
		}
		return null;
	}
	
	setValue(key: string, value: string): boolean {
		const api = this.getAPI();
		if (api) {
			const success = api.SetValue ? api.SetValue(key, value) : api.LMSSetValue(key, value);
			if (api.GetLastError() === "0") {
				return success === "true" || success === true;
			}
			console.error(`SCORM SetValue failed for key: ${key}`);
		}
		return false;
	}
	
	commit(): boolean {
		const api = this.getAPI();
		if (api) {
			return api.Commit ? api.Commit("") : api.LMSCommit("");
		}
		return false;
	}
}

export const scormService = new ScormService();
