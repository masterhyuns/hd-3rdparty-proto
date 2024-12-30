// scorm/Scorm2004Api.ts
import {ContentsPlayerApi, Scorm2004ApiType} from "./ContentsPlayerApi";

export class Scorm2004Api extends ContentsPlayerApi {
	private api: any;
	
	constructor(api: Scorm2004ApiType) {
		super();
		this.api = api;
	}
	
	onInit(): boolean {
		console.log("SCORM 2004 초기화");
		return this.api?.Initialize("") === "true";
	}
	
	setValue(key: string, value: string): boolean {
		console.log(`SCORM 2004: ${key} = ${value} 설정`);
		return this.api?.SetValue(key, value) === "true";
	}
	
	getValue(key: string): string | null {
		console.log(`SCORM 2004: ${key} 값 가져오기`);
		return this.api?.GetValue(key) || null;
	}
	
	commit(): boolean {
		console.log("SCORM 2004 데이터 커밋");
		return this.api?.Commit("") === "true";
	}
}
