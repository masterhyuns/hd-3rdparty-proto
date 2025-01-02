import {useEffect, useState, useRef} from "react";
import Scorm2004Handler from "./tobe/socrm2004Handler";

const KiaScormPlayer = () => {
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        // SCORM API 초기화
        new Scorm2004Handler();
        // iframe 로드 준비 완료
        setIframeLoaded(true);
    }, []);
    return (
        <div>
            <h2>SCORM Player</h2>
            {iframeLoaded ? (
                <iframe
                    src="https://kda.kia.com/gtaft/content/wbt/2024/1017/0001/585745/HKScorm/PackageImport/index_lms.html?deviceType=P"
                    width="100%"
                    height="500px"
                    title="SCORM Content"
                ></iframe>
            ) : (
                <p>Loading SCORM API...</p>
            )}
        </div>
    );
};

export default KiaScormPlayer;
