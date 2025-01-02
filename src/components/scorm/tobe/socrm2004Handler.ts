/**
 * SCORM 2004 핸들러 클래스
 * - SCORM API를 React 스타일로 리팩토링
 * - SCORM API 기능 (Initialize, GetValue, SetValue 등)을 제공
 * - window 객체에 API_1484_11로 등록
 */

// 에러 코드 정의
type ScormErrorCodes = keyof typeof SCORM2004_ERROR_CODES;

const SCORM2004_ERROR_CODES = {
    "0": "No Error",
    "101": "General Exception",
    "102": "General Initialization Failure",
    "103": "Already Initialized",
    "104": "Content Instance Terminated",
    "111": "General Termination Failure",
    "112": "Termination Before Initialization",
    "113": "Termination After Termination",
    "122": "Retrieve Data Before Initialization",
    "123": "Retrieve Data After Termination",
    "132": "Store Data Before Initialization",
    "133": "Store Data After Termination",
    "142": "Commit Before Initialization",
    "143": "Commit After Termination",
    "201": "General Argument Error",
    "301": "General Get Failure",
    "351": "General Set Failure",
    "391": "General Commit Failure",
    "401": "Undefined Data Model Element",
    "402": "Unimplemented Data Model Element",
    "403": "Data Model Element Value Not Initialized",
    "404": "Data Model Element Is Read Only",
    "405": "Data Model Element Is Write Only",
    "406": "Data Model Element Type Mismatch",
    "407": "Data Model Element Value Out Of Range",
    "408": "Data Model Dependency Not Established",
};

class Scorm2004Handler {
    private isInitialized: boolean = false; // 초기화 상태
    private isTerminated: boolean = false; // 종료 상태
    private lastErrorCode: ScormErrorCodes = "0"; // 마지막 에러 코드
    private context: string = ""; // 요청 기본 URL

    /**
     * 생성자
     * @param context SCORM 요청 기본 URL
     */
    constructor() {
        this.context = '';
        this.registerToWindow();
    }

    /**
     * window 객체에 SCORM API를 등록
     */
    private registerToWindow() {
        window.API_1484_11 = {
            Initialize: this.Initialize.bind(this),
            GetValue: this.GetValue.bind(this),
            SetValue: this.SetValue.bind(this),
            Commit: this.Commit.bind(this),
            Terminate: this.Terminate.bind(this),
            GetLastError: this.GetLastError.bind(this),
        };
    }

    /**
     * SCORM 초기화
     * @param param 초기화 매개변수 (""만 허용)
     * @returns 성공 시 "true", 실패 시 "false"
     */
    public Initialize(param: string): string {
        console.log('Initialize 호출됨 param {} => ', param)
        if (param) {
            this.setLastError("201");
            return "false";
        }
        if (this.isInitialized) {
            this.setLastError("103");
            return "false";
        }
        if (this.isTerminated) {
            this.setLastError("104");
            return "false";
        }
        const result = {"cors_in":394613,"lctr_in":147802,"lcrg_in":null,"user_sn":334696,"scit_in":16910,"scst_in":12877,"key":"cmi.progress_measure","value":"0.10204081632653061","scsl_in":2113441,"scit_id":"PRG_EV6PE_ENG_SCO","scom_in":14898,"scil_in":2877158,"lcus_in":null,"cotn_in":585745,"cotn_toc_in":0,"lctr_year":null,"save_yn":"Y","dvc_type_cd":"PC","org_in":null,"edu_strt_dt":null,"edu_end_dt":null,"lib_yn":"N"}


        this.isInitialized = true;
        this.setLastError("0");
        return "true";
    }

    /**
     * SCORM 값 가져오기
     * @param key 데이터 모델 키
     * @returns 값 또는 null
     */
    public GetValue(key: string): string | null {
        console.log('GetValue 호출됨 key => ', key)
        if (!this.isInitialized) {
            this.setLastError("122");
            return null;
        }
        if (this.isTerminated) {
            this.setLastError("123");
            return null;
        }
        if (!key) {
            this.setLastError("301");
            return null;
        }

        // 실제 요청은 생략하고 임시 값 반환
        return "sample_value";
    }

    /**
     * SCORM 값 설정
     * @param key 데이터 모델 키
     * @param value 설정할 값
     * @returns 성공 시 "true", 실패 시 "false"
     */
    public SetValue(key: string, value: string): string {
        console.log('SetValue 호출됨 key => ', key , '  value => ' , value)
        if (!this.isInitialized) {
            this.setLastError("132");
            return "false";
        }
        if (this.isTerminated) {
            this.setLastError("133");
            return "false";
        }
        if (!key || !value) {
            this.setLastError("351");
            return "false";
        }

        // 실제 요청은 생략하고 성공 시 true 반환
        return "true";
    }

    /**
     * SCORM 데이터 커밋
     * @param param 매개변수 (""만 허용)
     * @returns 성공 시 "true", 실패 시 "false"
     */
    public Commit(param: string): string {
        console.log('Commit 호출됨 param => ', param)
        if (param) {
            this.setLastError("201");
            return "false";
        }
        if (!this.isInitialized) {
            this.setLastError("142");
            return "false";
        }
        if (this.isTerminated) {
            this.setLastError("143");
            return "false";
        }

        return "true";
    }

    /**
     * SCORM 종료
     * @param param 매개변수 (""만 허용)
     * @returns 성공 시 "true", 실패 시 "false"
     */
    public Terminate(param: string): string {
        console.log('Terminate 호출됨 param => ', param)
        if (param) {
            this.setLastError("201");
            return "false";
        }
        if (!this.isInitialized) {
            this.setLastError("112");
            return "false";
        }
        if (this.isTerminated) {
            this.setLastError("113");
            return "false";
        }

        this.isTerminated = true;
        this.setLastError("0");
        return "true";
    }

    /**
     * 마지막 에러 코드 설정
     * @param code 에러 코드
     */
    private setLastError(code: ScormErrorCodes) {
        console.log('setLastError 호출됨 code => ', code)
        this.lastErrorCode = code;
    }

    /**
     * 마지막 에러 코드 반환
     * @returns 에러 코드
     */
    public GetLastError(): string {
        console.log('GetLastError 호출됨 lastErrorCode => ', this.lastErrorCode)
        return this.lastErrorCode;
    }

    /**
     * 에러 코드에 대한 설명 반환
     * @param code 에러 코드
     * @returns 에러 메시지
     */
    public GetErrorString(code: ScormErrorCodes): string {
        return SCORM2004_ERROR_CODES[code] || "Unknown Error";
    }
}

export default Scorm2004Handler;
