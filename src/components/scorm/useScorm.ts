import { useEffect, useState } from 'react';
import { scormHelper } from './ScormHelper';

export const useScorm = () => {
	const [initialized, setInitialized] = useState(false);
	
	useEffect(() => {
		const init = scormHelper.initialize();
		setInitialized(init);
		
		return () => {
			if (initialized) {
				scormHelper.terminate();
			}
		};
	}, [initialized]);
	
	const getValue = (key: string): string | null => {
		return scormHelper.getValue(key);
	};
	
	const setValue = (key: string, value: string): boolean => {
		return scormHelper.setValue(key, value);
	};
	
	const commit = (): boolean => {
		return scormHelper.commit();
	};
	
	return { initialized, getValue, setValue, commit };
};
