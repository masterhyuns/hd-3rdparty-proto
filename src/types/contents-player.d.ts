declare global {
	interface Window {
		API?: {
			LMSInitialize: (param: string) => string;
			LMSSetValue: (key: string, value: string) => string;
			LMSGetValue: (key: string) => string;
			LMSCommit: (param: string) => string;
			LMSFinish: (param: string) => string;
		};
		API_1484_11?: {
			Initialize: (param: string) => string;
			SetValue: (key: string, value: string) => string;
			GetValue: (key: string) => string | null;
			Commit: (param: string) => string;
			Terminate: (param: string) => string;
			GetLastError: () => string;
		};
	}
}
export {};