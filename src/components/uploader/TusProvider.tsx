import React, { createContext, useContext, useState, useCallback } from "react";
import { Upload } from "tus-js-client";

// Tus Upload 상태 타입
type UploadStatus = "idle" | "uploading" | "completed" | "error" | "cancelled";

// Tus Upload 상태를 나타내는 인터페이스
interface TusUpload {
	id: string; // 고유 ID
	file: File; // 업로드 중인 파일
	progress: number; // 업로드 진행률
	status: UploadStatus; // 업로드 상태
	tusUpload?: Upload; // Tus 업로드 객체 (필요 시 사용)
	error?: string; // 에러 메시지 (optional)
}

// Tus Context 인터페이스
interface UploadContextProps {
	uploads: TusUpload[]; // 전체 업로드 상태 배열
	startUpload: (file: File, endpoint: string) => void; // 업로드 시작
	cancelUpload: (id: string) => void; // 업로드 취소
	resumeUpload: (id: string, endpoint: string) => void; // 추가된 재개 기능
}

const UploadContext = createContext<UploadContextProps | null>(null);

// Provider Component
export const UploadProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [uploads, setUploads] = useState<TusUpload[]>([]);
	
	// 파일 업로드 시작
	
	const startUpload = useCallback((file: File, endpoint: string) => {
		const uploadId = `${file.name}-${Date.now()}`; // 파일 이름과 타임스탬프로 고유 ID 생성
		const newUpload: TusUpload = {
			id: uploadId,
			file,
			progress: 0,
			status: "uploading",
		};
		
		// Tus 업로드 객체 생성
		const tusUpload = new Upload(file, {
			endpoint,
			chunkSize: 5 * 1014  *1024,
			metadata: { filename: file.name },
			onProgress: (bytesUploaded, bytesTotal) => {
				const progress = (bytesUploaded / bytesTotal) * 100;
				
				// 진행률 업데이트
				setUploads((prevUploads) =>
					prevUploads.map((upload) =>
						upload.id === uploadId ? { ...upload, progress } : upload
					)
				);
			},
			onSuccess: () => {
				// 업로드 완료 상태 업데이트
				setUploads((prevUploads) =>
					prevUploads.map((upload) =>
						upload.id === uploadId ? { ...upload, status: "completed", progress: 100 } : upload
					)
				);
			},
			onError: (error) => {
				// 에러 상태 업데이트
				setUploads((prevUploads) =>
					prevUploads.map((upload) =>
						upload.id === uploadId
							? { ...upload, status: "error", error: error.message }
							: upload
					)
				);
			},
		});
		
		// Tus 업로드 시작
		tusUpload.start();
		
		// 새로운 업로드 추가
		setUploads((prevUploads) => [
			...prevUploads,
			{ ...newUpload, tusUpload },
		]);
	}, []);
	
	// 파일 업로드 취소
	const cancelUpload = useCallback((id: string) => {
		setUploads((prevUploads) => {
			const uploadToCancel = prevUploads.find((upload) => upload.id === id);
			if (uploadToCancel?.tusUpload) {
				uploadToCancel.tusUpload.abort(); // Tus 업로드 취소
			}
			return prevUploads.map((upload) =>
				upload.id === id ? { ...upload, status: "cancelled" } : upload
			);
		});
	}, []);
	
	const resumeUpload = useCallback((id: string, endpoint: string) => {
		const uploadToResume = uploads.find((upload) => upload.id === id);
		if (uploadToResume?.tusUpload) {
			const tusUpload = new Upload(uploadToResume.file, {
				endpoint,
				metadata: { filename: uploadToResume.file.name },
				uploadUrl: uploadToResume.tusUpload.url, // 기존 URL을 사용하여 재개
				onProgress: (bytesUploaded, bytesTotal) => {
					const progress = (bytesUploaded / bytesTotal) * 100;
					setUploads((prevUploads) =>
						prevUploads.map((upload) =>
							upload.id === id ? { ...upload, progress } : upload
						)
					);
				},
				onSuccess: () => {
					setUploads((prevUploads) =>
						prevUploads.map((upload) =>
							upload.id === id ? { ...upload, status: "completed", progress: 100 } : upload
						)
					);
				},
				onError: (error) => {
					setUploads((prevUploads) =>
						prevUploads.map((upload) =>
							upload.id === id
								? { ...upload, status: "error", error: error.message }
								: upload
						)
					);
				},
			});
			tusUpload.start();
			setUploads((prevUploads) =>
				prevUploads.map((upload) =>
					upload.id === id ? { ...upload, tusUpload } : upload
				)
			);
		}
	}, [uploads]);
	
	return (
		<UploadContext.Provider value={{ uploads, startUpload, cancelUpload , resumeUpload}}>
			{children}
		</UploadContext.Provider>
	);
};

// Context Hook
export const useUpload = () => {
	const context = useContext(UploadContext);
	if (!context) {
		throw new Error("useUpload must be used within an UploadProvider");
	}
	return context;
};
