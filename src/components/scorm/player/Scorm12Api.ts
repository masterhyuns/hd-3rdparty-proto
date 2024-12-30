// scorm/Scorm12Api.ts
import {ContentsPlayerApi, Scorm12ApiType} from "./ContentsPlayerApi";

export class Scorm12Api extends ContentsPlayerApi {
	private api: Scorm12ApiType;
	
	
	constructor(api: Scorm12ApiType) {
		super();
		this.api = api;
	}
	
	/**
	 * 초기화 자체 함수
	 * @protected
	 */
	protected onInit(): boolean {
		console.log("SCORM 1.2 초기화");
		const isInitialized = this.api.LMSInitialize("") === "true"
		this.isInitialized = isInitialized;
		return isInitialized
	}
	
	setValue(key: string, value: string): boolean {
		console.log(`SCORM 1.2: ${key} = ${value} 설정`);
		return this.api?.LMSSetValue(key, value) === "true";
	}
	
	getValue(key: string): string | null {
		console.log(`SCORM 1.2: ${key} 값 가져오기`);
		return this.api?.LMSGetValue(key) || null;
	}
	
	commit(): boolean {
		console.log("SCORM 1.2 데이터 커밋");
		return this.api?.LMSCommit("") === "true";
	}
	
	isInit(): boolean{
		return this.isInitialized
	}
}
