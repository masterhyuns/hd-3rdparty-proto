export class ScormHelper {
	private api: any = null;
	
	constructor() {
		this.findAPI();
	}
	
	private findAPI(): void {
		let win: any = window;
		console.log(win)
		// iFrame 부모에서 SCORM API 검색
		for (let i = 0; i < 10; i++) {
			if (win.API || win.API_1484_11) {
				this.api = win.API || win.API_1484_11;
				return;
			}
			if (win.parent === win) break;
			win = win.parent;
		}
		
		if (!this.api) {
			console.error('SCORM API not found');
		}
	}
	
	initialize(): boolean {
		if (this.api) {
			const result = this.api.Initialize ? this.api.Initialize('') : this.api.LMSInitialize('');
			return result === 'true' || result === true;
		}
		console.error('SCORM API is not available.');
		return false;
	}
	
	terminate(): boolean {
		if (this.api) {
			const result = this.api.Terminate ? this.api.Terminate('') : this.api.LMSFinish('');
			return result === 'true' || result === true;
		}
		console.error('SCORM API is not available.');
		return false;
	}
	
	getValue(key: string): string | null {
		if (this.api) {
			const value = this.api.GetValue ? this.api.GetValue(key) : this.api.LMSGetValue(key);
			if (this.api.GetLastError() !== '0') {
				console.error(`Error getting value for key: ${key}`);
				return null;
			}
			return value;
		}
		console.error('SCORM API is not available.');
		return null;
	}
	
	setValue(key: string, value: string): boolean {
		if (this.api) {
			const result = this.api.SetValue ? this.api.SetValue(key, value) : this.api.LMSSetValue(key, value);
			if (this.api.GetLastError() !== '0') {
				console.error(`Error setting value for key: ${key}, value: ${value}`);
				return false;
			}
			return result === 'true' || result === true;
		}
		console.error('SCORM API is not available.');
		return false;
	}
	
	commit(): boolean {
		if (this.api) {
			const result = this.api.Commit ? this.api.Commit('') : this.api.LMSCommit('');
			return result === 'true' || result === true;
		}
		console.error('SCORM API is not available.');
		return false;
	}
}

export const scormHelper = new ScormHelper();
