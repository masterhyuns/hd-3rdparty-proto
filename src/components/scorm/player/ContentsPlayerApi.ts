
type contentsType = 'SCORM' | 'HTML5' | 'E-CONTENTS' | undefined
type contentsVersion = '1.2' | '2004' | 'E-CONTENTS' | undefined

// scorm/ScormApiTypes.ts

/** SCORM 1.2 API 타입 정의 */
export interface Scorm12ApiType {
	LMSInitialize: (param: string) => string;
	LMSSetValue: (key: string, value: string) => string;
	LMSGetValue: (key: string) => string;
	LMSCommit: (param: string) => string;
	LMSFinish: (param: string) => string;
}

/** SCORM 2004 API 타입 정의 */
export interface Scorm2004ApiType {
	Initialize: (param: string) => string;
	SetValue: (key: string, value: string) => string;
	GetValue: (key: string) => string;
	Commit: (param: string) => string;
	Terminate: (param: string) => string;
}



// scorm/ScormApi.ts
export abstract class ContentsPlayerApi {
	protected isInitialized: boolean = false; // 초기화 여부
	protected type:contentsType;
	protected version:contentsVersion;
	
	abstract getValue(key: string): string | null;
	abstract commit(): boolean;
	abstract setValue(key: string, value: string): boolean;
	
	constructor () {
		this.isInitialized = false
	}
	
	/**
	 * 플레이어 초기화 로직을 처리하는 추상 메서드
	 * 각 하위 클래스에서 구현되어야 함
	 */
	protected abstract onInit(): boolean;
	
	/**
	 * init 메서드
	 */
	init(): boolean {
		console.log('contents player init')
		const isInitialized = this.onInit();
		return isInitialized;
	}
	
	/**
	 * 초기화 여부
	 */
	isInit(): boolean {
		return this.isInitialized;
	}
	
	// SCORM 종료 (공통)
	finish(): boolean {
		console.log("SCORM 세션 종료");
		return true;
	}
}
