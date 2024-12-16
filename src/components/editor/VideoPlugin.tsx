// 파일명: VideoPlugin.tsx
import React, { useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $createVideoNode } from './VideoNode';

const VideoPlugin = () => {
	const [editor] = useLexicalComposerContext();
	const [url, setUrl] = useState('');
	
	const handleInsert = () => {
		if (url) {
			editor.update(() => {
				const videoNode = $createVideoNode(url);
				/*@ts-ignore*/
				const selection = editor.getEditorState().read(() => editor.getSelection());
				if (selection) {
					selection.insertNodes([videoNode]);
				}
			});
			setUrl('');
		}
	};
	
	return (
		<div style={{ marginBottom: '10px' }}>
			<input
				type="text"
				placeholder="Enter video URL"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
				style={{ marginRight: '10px', padding: '5px', width: '300px' }}
			/>
			<button onClick={handleInsert} style={{ padding: '5px 10px' }}>
				Insert Video
			</button>
		</div>
	);
};

export default VideoPlugin;
