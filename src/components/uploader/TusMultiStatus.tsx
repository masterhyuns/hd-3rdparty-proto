import React, { useRef } from "react";
import {useUpload} from "./TusProvider";

const TusMultiUploder = () => {
	const { uploads, cancelUpload , resumeUpload } = useUpload();
	
	return (
			<div>
				{uploads.map(({id, file, progress, status, error}) => (
					<div key={id} style={{marginBottom: "1rem", width: "100%"}}>
						<p>
							<strong>{file.name}</strong> - {status} ({progress.toFixed(2)}%)
						</p>
						{status === "uploading" && (
							<div style={{width: "100%", backgroundColor: "#f3f3f3", borderRadius: "5px"}}>
								<div
									style={{
										height: "8px",
										backgroundColor: "#4caf50",
										width: `${progress}%`,
										borderRadius: "5px",
									}}
								/>
							</div>
						)}
						{status === "cancelled" && (
							<button onClick={() => resumeUpload(id, "http://localhost:8080/tus/upload")}>
								Resume Upload
							</button>
						)}
						{status === "uploading" && (
							<button onClick={() => cancelUpload(id)}>Cancel Upload</button>
						)}
						
						{status === "completed" && <p>Upload Complete!</p>}
						{status === "error" && <p style={{color: "red"}}>Error: {error}</p>}
						{status === "cancelled" && <p>Upload Cancelled</p>}
					</div>
				))}
			</div>
	);
};

export default TusMultiUploder;
