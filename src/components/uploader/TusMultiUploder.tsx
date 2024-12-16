import React, { useRef } from "react";
import {useUpload} from "./TusProvider";

const TusMultiUploder = () => {
	const { startUpload, uploads } = useUpload();
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	
	const handleFilesChange = () => {
		if (fileInputRef.current?.files) {
			const files = Array.from(fileInputRef.current.files);
			files.forEach((file) => startUpload(file, "http://localhost:8080/tus/upload"));
		}
	};
	
	return (
		<div>
			<input
				type="file"
				multiple
				ref={fileInputRef}
				onChange={handleFilesChange}
				style={{ display: "block", margin: "1rem 0" }}
			/>
			<div>
				{uploads.map(({ id, file, progress, status, error }) => (
					<div key={id} style={{ marginBottom: "1rem" }}>
						<p>
							<strong>{file.name}</strong> - {status} ({progress.toFixed(2)}%)
						</p>
						{status === "error" && <p style={{ color: "red" }}>Error: {error}</p>}
					</div>
				))}
			</div>
		</div>
	);
};

export default TusMultiUploder;
