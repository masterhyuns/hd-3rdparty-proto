import {useCallback} from "react";
import { useDropzone } from 'react-dropzone';
import {useUpload} from "./TusProvider";

const DndUpload = () => {
	const { startUpload } = useUpload();
	// @ts-ignore
	const onDrop = useCallback((acceptedFiles) => {
		console.log(acceptedFiles);
		// 파일 처리 로직
		// @ts-ignore
		acceptedFiles.forEach((file) => {
			/*const reader = new FileReader();
			reader.onload = () => {
				console.log(reader.result); // 파일 내용 (예: 이미지 미리보기)
			};
			reader.readAsDataURL(file);*/
			startUpload(file, "http://localhost:8080/tus/upload")
		});
	}, []);
	
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
	
	return (
		<div
			{...getRootProps()}
			style={{
				border: '2px dashed #cccccc',
				borderRadius: '8px',
				padding: '20px',
				textAlign: 'center',
				cursor: 'pointer',
				backgroundColor: isDragActive ? '#f0f0f0' : '#ffffff',
			}}
		>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>파일을 놓으세요!</p>
			) : (
				<p>여기에 파일을 드래그하거나 클릭하여 업로드하세요.</p>
			)}
		</div>
	);
};

export default DndUpload;
