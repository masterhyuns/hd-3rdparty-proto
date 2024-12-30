import React, { useEffect, useState } from 'react';
import { useScorm } from './useScorm';

const ScormContainer: React.FC = () => {
	const { initialized, getValue, setValue, commit } = useScorm();
	const [score, setScore] = useState<string | null>('');
	
	useEffect(() => {
		if (initialized) {
			const fetchedScore = getValue('cmi.score.raw');
			setScore(fetchedScore);
		}
	}, [initialized, getValue]);
	
	const handleSaveScore = () => {
		if (setValue('cmi.score.raw', score || '0')) {
			commit();
			alert('Score saved successfully!');
		} else {
			alert('Failed to save score.');
		}
	};
	
	return (
		<div>
			<h1>SCORM Content</h1>
			<iframe
				src="https://cloud.scorm.com/ScormEngineInterface/defaultui/player/modern.html?configuration=E3b2_rOKRLwDjLqHOsonT18efiHcQ49CyXzzaHQe3dXLZcrX15K0EbSGx4x9SoHiVwxlZsfb1BzIoSrBgPFq4Tg9tGxzSnOiKNR7YBoCdJF4he5hlIyP4DUHr6boDpscZApI2iU29aK14EAgofMZtvAVwKx22T9Ds0lv7D95azuM9_AahubJCEMsejruzRFsWJsHYr44UlVPeUhBzkJPv-fL11xyjpb-UrskTdrXzFnxSzz4qh7qNVoxqXeG5oqfxvTYvJ9_t6BLXGwvhRD48k79c0J4S9F_lCTDrPvucTjwjWtdGzTNUBiinbYjxASB4vKOC8tGpJSjZVlShmYjl2jzey01zB96oEiMYMBcNkkazri8qjXJKNUoMh6HkYcl8m9siMZTY3RwmrA8eIg8kPNB_acyNG35j0jjmPXXSaK1XFFkg9QB5pMREItV6xhkJX2dC6ErGj76A9UG_uJubGfPFf2iBgDZdg4Nl4udK9CilO14OfbEWlVLkA5192RzSO-KPP3hdXSr2Qew3AnBD8lJme9eJRCzo_lGRL9lGOvvJvD4GsV5QxScrV6CMhes83h61yrTkE7tuQcgc8B1OHIGZta-1I639DZTRZIeZAUcmOy9onXJvh_Da_HMcoi4iwHJGLS1xpBOXy1hz7sfIhRPKwSAZd7NvNI9NmV7A7fnnltZtnzqMfJvIewcdan2HryjN2QdhTZx2pLrL2salchOoE34kEeOMQcc5bx0MynDcUtwWNQxlhZILKJobJfnKtYHdErlIYKycql_Gir9VoGx_zSWGo6wnQ2jQDJuOBkqSCUkAI2_pEpa5UOQ-OcywvJH97r6pAB-OaBS1kAaRNPtdzeNzSVkQ-GKFaOkZ8OeGLUsK9GrQzYcyRr14ZOFZfetGVcfuH1-YG3i0aJeFFPZaQm18d-o4lp7PuU5CEaVtTv0EHmJ66Dh14llCJxJbuOw2_129yVII6KYbYHvLfGSakLfUpT65lngKPVw4-8JAAR39vutjbGmktqcXwKjF8lXlzi-eSB9QgMgOUpqxJxvfks6xsaGlbTjIndMoKoVKrLI94BE9edzpbO6pheScvSkWnPUseblis8&preventRightClick=false&cc=ko_KR&cache=21.1.35.500&playerConfUrl=j&package=KZxMq2iXQZK_qDHwbBgquIIX4_C4iZ2WeMCCxoBa7YqYerlwSkcoJr7colAbyh4aDpv9kTUUcY-Fzyh7dWvr-2hSBGxzwDuC44FImm9ylC186wyVdl6u5z2skP-ZxlLXZC5KOg0Rd4z2YxXS6rjSs7_7wbQryiHRc7pIv4s&redirectUrl=https%3A%2F%2Fapp.cloud.scorm.com%2Fsc%2Fuser%2FPostLaunch%3FappId%3DK9144O4JY4%26realmId%3Df1e5ca7e-53d0-4aa5-a4ab-2464f3f45a4e%26registrationId%3D51454cd1-6d21-4522-88f6-e35e40154b99%26redirectUrl%3Dhttps%253A%252F%252Fapp.cloud.scorm.com%252Fsc%252Fuser%252FCourse%253FcourseId%253DContentPackagingOneFilePerSCO_SCORM12730d1178-7327-4c8c-9b64-166d40e50c34%2526appId%253DK9144O4JY4%2526preserveMessages%253Dtrue&registration=zS_Wxc_fLW84M7NkudQOHZ2reFus61zJeGT-BO4Fe4mnFKZLOXXySkcKGHOjuoBtZhBjCuikcB8FCyKnDVDz5jKYcMhViY3SD638CngMnkT-4Xx8h4hpi73G24_7Na8&tracking=true&forceReview=false&player=modern&ts=20241226232426"
				title="SCORM Content"
				style={{ width: '100%', height: '500px', border: 'none' }}
			/>
			<div>
				<label>Score:</label>
				<input
					type="text"
					value={score || ''}
					onChange={(e) => setScore(e.target.value)}
				/>
				<button onClick={handleSaveScore}>Save Score</button>
			</div>
		</div>
	);
};

export default ScormContainer;
