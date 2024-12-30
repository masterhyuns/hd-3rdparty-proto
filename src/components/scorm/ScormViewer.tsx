import React, { useEffect, useRef } from "react";
import { scormService } from "./ScormService";

const ScormViewer: React.FC = () => {
	const iframeRef = useRef<HTMLIFrameElement>(null);
	
	useEffect(() => {
		/*const iframe = iframeRef.current;
		console.log(iframe)
		if (iframe) {
			iframe.onload = () => {
				// Set the iframe window for SCORM service
				const iframeWindow = iframe.contentWindow;
				scormService.setIframeWindow(iframeWindow);
				
				// Initialize SCORM API
				const initialized = scormService.initialize();
				console.log('initialized => ', initialized)
				if (initialized) {
					console.log("SCORM Initialized");
					
					// Example: Fetch learner name
					const learnerName = scormService.getValue("cmi.core.student_name");
					console.log("Learner Name:", learnerName);
				} else {
					console.error("Failed to initialize SCORM.");
				}
			};
		}
		
		return () => {
			// Terminate SCORM session on component unmount
			scormService.terminate();
		};*/
	}, []);
	
	const handleSaveScore = () => {
		const success = scormService.setValue("cmi.score.raw", "95");
		if (success) {
			scormService.commit();
			console.log("Score saved successfully.");
		} else {
			console.error("Failed to save score.");
		}
	};
	
	const setScorm = () => {
		const iframe = iframeRef.current;
		console.log(iframe)
		if ( iframe ){
			const iframeWindow = iframe.contentWindow;
			scormService.setIframeWindow(iframeWindow);
			const initialized = scormService.initialize();
			console.log('initialized => ', initialized)
		}
		
		
	}
	return (
		<div>
			<h1>SCORM Viewer</h1>
			<button onClick={setScorm}>스콤초기화</button>
			<iframe
				ref={iframeRef}
				//src="/ScormEngineInterface/defaultui/player/modern.html?configuration=8RK3nxqy83DB6Xx9WAq3WXtuiVRRYr6rCUip8DfH4fnolWWO0YFEjtdsuwxP8l_2fqUFe3XtBdOZfjvWxNVTj90mtlo8RI4Jqk0t-6uI4lbMEWh1ATUl4T-siD33WuqoO-YIxyBTeisW52KfLwgipsW47AY5xzW39rzvvdTumcTzBKVSeOiz-S3N_pmFq4eLp2t4a4simouKh7rM3YiyEs7YPhDAU1qi3uu4BdG90LWoHv8-Sr0a4Zl_S3XbZUKv5DCxeWMqYbJda_IHtMZvQS4ZB2arDQYw-DtfrkCWEdSxXZEY9cp8AYboAh6R0oHeYkimmVpvreiBG9Rvo2O4ig9MxCFGy5h8EHZwLa63CPzIZt0pjEUINogCnjsinrmmMVC1R7zmLgDuc-iHAr4a0S5hFKWopdDxngkcdL_Q8kmD-FEy3npPr6b0smFgc3VLzqXirCKh4FVKeMjwFhYZBdkkPsEl3yTw7Ta-RKhnbhYxladZzXR6FG_Wn5Fz4tcqfKEUjeRHhUV3_6qgl42O9ruKAuvffxm49QAFcyja2scIIILtBhfRfGIz8jNFlMY3HzOjFa0JZ-UneUT7VELUrBpnZxW5tX9pWp6EAIvlHoBfiN8EsCssydq5H7feS4q_sL_ZjJ-nyV3rQB7-GpGAGHAJZXVshw0cvFSH0LCRuQbtnam_3Rrgitf0WmG-2E5ql6Ip-50glvOXy_289sbPxhGBJ83oOURjO48ACAx7xRC6mB6zeNUp3w81K_a7gpL96UUcO3w45Kc3s8pVxTgfmXH7WxR1YrlY04ytZdWr-gmBUD9AiJL6WhCu-L_DZs_wEHJ47Nh9GHY0MDQHYwaVy-GN3Z5mZlSyYbvQReQpD6FaTPrZ6qOs_8W5u50s9z6JH0E__E6RDh4KbAs8Lr0l_8wLeuUeF6qWHgh2Du6qi7PCvXELhayyRBGZRqC7tODS7XlRHTMle2-AgUud81wV8RDdAjrD2ezzpoMYjRlE8x0QqqyXNU44LxmtC_z-tyOJBA0tVhPD2MloqZhKk0XG5vjzzOWFRNih4L0m2nH0hx3Q&preventRightClick=false&cc=ko_KR&cache=21.1.35.500&playerConfUrl=j&package=pBEGTHUTd4WqMOTYdI541LthH_Q8jp-ZM8nrNQpjkGP2lMxXoHImFNMjTe3w2blzEPlQJYHQnwdWDKpCy4Xe_7i7R10JtKuAOwUX_rz8csntexkH_OekeuqIqRJJGJKn_bCwOiP6ns1TWEur1xHUlN0B31UQHGE-r_8Bt6o&redirectUrl=https%3A%2F%2Fapp.cloud.scorm.com%2Fsc%2Fuser%2FPostLaunch%3FappId%3DK9144O4JY4%26realmId%3Df1e5ca7e-53d0-4aa5-a4ab-2464f3f45a4e%26registrationId%3D51454cd1-6d21-4522-88f6-e35e40154b99%26redirectUrl%3Dhttps%253A%252F%252Fapp.cloud.scorm.com%252Fsc%252Fuser%252FCourse%253FappId%253DK9144O4JY4%2526courseId%253DContentPackagingOneFilePerSCO_SCORM12730d1178-7327-4c8c-9b64-166d40e50c34&registration=eWukOnDNKoFdNnGV3MlsQSOMBYMAAzzxTkkWtPDT8SXMdZzJv3oNVqGe7IPVrLUBHiGQZSSX0kk6o_dPy6S_olCjc7jMcHKmogqbga7O_Vc6W2ftoScBeUGMC7LLtOM&tracking=true&forceReview=false&player=modern&ts=20241226233352" // Replace with your SCORM URL
				//src="https://app.cloud.scorm.com/sc/InvitationConfirmEmail?publicInvitationId=9763de7a-e250-467f-8779-629f73913fc4"
				//src="http://localhost:8888/mod/scorm/player.php" // Replace with your SCORM URL
				//src="http://localhost:8888/enrol/index.php?id=2" // Replace with your SCORM URL
				//src="https://cloud.scorm.com/ScormEngineInterface/defaultui/player/modern.html?configuration=hiC4Ga4flhqeRtsdF-DtXKqrA97XvKIq6MBWxla3E1ZQAXxjRtOdpnGONZOcUSSIP_vTLjU868STbcntRcitfDr9AIi4zS3R0fjCF1IoRW6isrpiQdlShlLZt2uNC8St_kEheGNEmHH5LqDBR705Jq-mP-f1NHGjwIetqhKd3Se1yh0XyEzj-9NUN4CL9Q9KOpj_L5Mcye0X5-ZIteOWRVVqD7-YVsYlmKg3RrhgKv4gwBeIWvFxphQMNGxo1z2wB-P28HoXpBbR-mU0qE-GB9KrwuTEy6HlgCyeuuB0YTi7ABQeNUyjtuRfq3Mw9Snq5xqZqV3A4cTRqFr1KUIcluK4zYkQmPjQw4BkOb0rRhpPTbjDvFNfwDFgs9e19dIwOWQobtJbxTrAvSPCWRnercVtZZ0AaJKUAfISW4LM9A5nIsBbEBAiO_9JOC4Cx32H2-vr1JNJ2sWIB9LtUGTIlv90AurGjRJN1Slx--nlZ-AJf6migGMvPIdFClee1bG5w3-jpD8lWMcamV2jH3VIasljAyceYS_HEUgnKGAdFxhH-9zaXF5oFTeEhVoZw3epWezMFRn2Jv2xWkATTLlieh-b1B7j-rSpVNo5xfCI--KblfCBFZ6d0jw9elqolk_ibEafNXowqM5DJeDewkQMXXbDTVkrqhyuRnq7irX1XN-5g34NEhJaXmU2UdZr-b4ZYdw6SV6OoeKuHEVZBs2WWzExrG1W-bayv0XRlA7OTCrtf9FyiDOToLh-PO9asKt5g43pGmdqYZHX2g4gkE27f71ClAyJ2IBJmhwElFI92y_bsDb2SW7Jv2YOrLFyMxfHQw-H6Jm1WgjM44LC3Edi4MiQdxSlHIwzUh9ZqzDYQOcNevwKcPV32bBG4bygS5FZ7WgQPNRNbtJrvIWEFdLUiOUnK2LyHARfSCaBiHDcT5mTH4QY7QmXNPpz-3EWxweeVSy-uRel0F3Fq-AbNs5TZYEhKxs-_dsUEiKbwDkDbk2Ox1sWM3VFZA1z_zRL63wjy5oVQ2JynY4EtnKP0SSNQf5jvHQeKgrTJDtvPmTtmHTN&preventRightClick=false&cc=ko_KR&cache=21.1.35.500&playerConfUrl=j&package=RNfzEem8BZymmdw4xBFgqvWp5ue-6QJeAbGVesfIzqJ-8ekeLfVSc3G5KOVHDoSyu4jbD2Rk_cpMx_pqx4UU_9Ig225Iw2Ag_Pq0W_WXmrlKc-b4MUGL5ItZ8SAl96a1tOjIP6buf21wR0N2mU4igYEOz-kvXMldasHCTok&redirectUrl=https%3A%2F%2Fapp.cloud.scorm.com%2Fsc%2Fuser%2FPostLaunch%3FappId%3DK9144O4JY4%26realmId%3Df1e5ca7e-53d0-4aa5-a4ab-2464f3f45a4e%26registrationId%3D51454cd1-6d21-4522-88f6-e35e40154b99%26redirectUrl%3Dhttps%253A%252F%252Fapp.cloud.scorm.com%252Fsc%252Fuser%252FCourse%253FappId%253DK9144O4JY4%2526courseId%253DContentPackagingOneFilePerSCO_SCORM12730d1178-7327-4c8c-9b64-166d40e50c34&registration=6rOZJDcOnzsfEKO_RhIVYid5HAZDJApUlCkHbnP8DequQDOhzvXLcqDQagvitizakbQ9tP0rtDM-mcNDeJuJWIW-cdhoUWeT1WKuJljVuoPf5u3A0kJrojT4tkEmr7A&tracking=true&forceReview=false&player=modern&ts=20241227042755" // Replace with your SCORM URL
				src="https://app.cloud.scorm.com/sc/InvitationConfirmEmail?publicInvitationId=d6c47ba2-b441-42c3-a855-05b450d7c353" // Replace with your SCORM URL
				style={{ width: "100%", height: "600px", border: "none" }}
				title="SCORM Content"
			></iframe>
			<button onClick={handleSaveScore}>Save Score</button>
		</div>
	);
};

export default ScormViewer;
