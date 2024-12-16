// 파일명: VideoNode.tsx
import { DecoratorNode } from 'lexical';
import React from 'react';

/*@ts-ignore*/
export class VideoNode extends DecoratorNode {
	__src: string;
	
	static getType() {
		return 'video';
	}
	
	static clone(node: VideoNode) {
		/*@ts-ignore*/
		return new VideoNode(node.__src, node.__key);
	}
	
	constructor(src: string, key?: string) {
		super(key);
		this.__src = src;
	}
	
	createDOM() {
		const container = document.createElement('div');
		container.className = 'video-container';
		return container;
	}
	
	updateDOM() {
		return false;
	}
	
	decorate() {
		return <VideoComponent src={this.__src} />;
	}
}

export function $createVideoNode(src: string) {
	return new VideoNode(src);
}

export function $isVideoNode(node: any) {
	return node instanceof VideoNode;
}

const VideoComponent = ({ src }: { src: string }) => (
	<div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
		<iframe
			src={src}
			frameBorder="0"
			allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
			allowFullScreen
			style={{
				position: 'absolute',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
			}}
		/>
	</div>
);
