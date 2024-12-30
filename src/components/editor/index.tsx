import React, {FC, forwardRef, useImperativeHandle} from "react";
import {LexicalComposer} from "@lexical/react/LexicalComposer";
import {RichTextPlugin} from "@lexical/react/LexicalRichTextPlugin";
import {ContentEditable} from "@lexical/react/LexicalContentEditable";
import {HistoryPlugin} from "@lexical/react/LexicalHistoryPlugin";
import {$getRoot, $createTextNode, $insertNodes, createCommand, COMMAND_PRIORITY_EDITOR, TextNode} from 'lexical';
import { HeadingNode, $createHeadingNode } from '@lexical/rich-text';
import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {$generateHtmlFromNodes, $generateNodesFromDOM} from "@lexical/html";
import LexicalErrorBoundary from "./plugins/lexical-error-boundary"; // HeadingNode 가져오기
import ToolbarPlugin from "./plugins/toolbar.plugin";
import FeaturePlugin from "./plugins/feature.plugin";
import theme from "./theme";
import AutoLinkPlugin from "./plugins/auto-link.plugin";
import {AutoLinkNode, LinkNode} from "@lexical/link";
import {ReactPlayerNode} from "./nodes/react-player.node";
import {TableCellNode, TableNode, TableRowNode} from "@lexical/table";
import {ImageNode} from "./nodes/ImageNode";
import TreeViewPlugin from "./plugins/tree-view.plugin";
import {LinkPlugin} from "@lexical/react/LexicalLinkPlugin";
import DraggableBlockPlugin from "./plugins/DraggableBlockPlugin";
import {TablePlugin} from "@lexical/react/LexicalTablePlugin";
import TableCellResizer from "./plugins/TableCellResizer";
import ImagesPlugin from "./plugins/ImagesPlugin";

// 사용자 정의 Command 생성
const INSERT_HEADING_COMMAND = createCommand<string>();

// Basic RichTextEditor component
const RichTextEditor = forwardRef((_, ref) => {



// 초기 설정
	const initialConfig = {
		namespace: 'MyEditor',
		theme: theme,
		onError: (error: Error) => {
			console.error('Lexical Editor Error:', error);
		},
		
		nodes: [HeadingNode, TextNode, AutoLinkNode, LinkNode, ReactPlayerNode, TableNode, TableRowNode, TableCellNode, ImageNode], // HeadingNode 등록
	};

	
	const editorConfig = {
		...initialConfig,
		editorState: () => {
			// 에디터의 초기 상태 정의
			const root = $getRoot(); // 루트 노드 가져오기
			/*if (root.getFirstChild() === null) {
				const heading = $createHeadingNode('h1'); // h1 노드 생성
				heading.append($createTextNode('안녕하세요')); // 텍스트 노드 추가
				root.append(heading); // 루트에 추가
			}*/
		},
	};
	
	
	
	return (
		<LexicalComposer initialConfig={editorConfig}>
			<ToolbarPlugin/>
			<div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
				<RichTextPlugin
					contentEditable={<ContentEditable className="editor-content" />}
					placeholder={<Placeholder />}
					ErrorBoundary={LexicalErrorBoundary}
				/>
				<ExportHTMLPlugin/>
				<DraggableBlockPlugin/>
				{/*<InitialContentPlugin/>*/}
				<HistoryPlugin />
				{/*<HtmlContentPlugin />*/}
				<CommandPlugin/>
				<HeadingButton/>
				<ExposeEditor ref={ref} />
				<AutoLinkPlugin/>
				<LinkPlugin/>
				<TreeViewPlugin/>
				<TablePlugin/>
				<TableCellResizer/>
				<ImagesPlugin/>
			</div>
			<div>
			<FeaturePlugin/>
			</div>
		</LexicalComposer>
	);
});

export default RichTextEditor;

const ExportHTMLPlugin: FC = () => {
	const [editor] = useLexicalComposerContext();
	
	const handleGetHTML = () => {
		editor.getEditorState().read(() => {
			const html = $generateHtmlFromNodes(editor);
			console.log(html); // "깨끗한 HTML 출력"
		});
	};
	
	return <button onClick={handleGetHTML}>GET HTML</button>
}
// 서버에서 HTML을 가져와 에디터 상태에 삽입하는 플러그인
const HtmlContentPlugin: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	
	React.useEffect(() => {
		// 서버에서 가져온 HTML (예: API 호출 결과)
		const htmlFromServer = `<h1>안녕하세요</h1><p>이것은 서버에서 가져온 콘텐츠입니다.</p>`;
		
		// HTML을 Lexical 노드로 변환하여 삽입
		editor.update(() => {
			// In the browser you can use the native DOMParser API to parse the HTML string.
			const parser = new DOMParser();
			const dom = parser.parseFromString(htmlFromServer, "text/html");
			
			// Once you have the DOM instance it's easy to generate LexicalNodes.
			const nodes = $generateNodesFromDOM(editor, dom);
			
			// Select the root
			$getRoot().select();
			
			// Insert them at a selection.
			$insertNodes(nodes);
		});
	}, [editor]);
	
	return null;
};


// 초기 콘텐츠 설정 플러그인
const InitialContentPlugin: React.FC = () => {
	const [editor] = useLexicalComposerContext(); // Lexical 에디터 인스턴스 가져오기
	
	React.useEffect(() => {
		editor.update(() => {
			const root = $getRoot(); // 루트 노드 가져오기
			if (root.getFirstChild() === null) {
				const heading = $createHeadingNode('h1'); // h1 노드 생성
				heading.append($createTextNode('안녕하세요!!!')); // 텍스트 노드 추가
				root.append(heading); // 루트에 추가
			}
		});
	}, [editor]);
	
	return null;
};

// Placeholder 컴포넌트
export const Placeholder: FC = () => {
	return <div style={{ color: '#aaa' }}>Start typing...</div>;
};


// Command로 노드 추가
const CommandPlugin: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	
	React.useEffect(() => {
		const removeListener = editor.registerCommand(
			INSERT_HEADING_COMMAND,
			(payload: string) => {
				editor.update(() => {
					const root = $getRoot();
					const heading = $createHeadingNode('h1');
					heading.append($createTextNode(payload));
					root.append(heading);
				});
				return true;
			},
			COMMAND_PRIORITY_EDITOR
		);
		
		return () => {
			removeListener();
		};
	}, [editor]);
	
	return null;
};

// 버튼 컴포넌트로 Command 실행
const HeadingButton: React.FC = () => {
	const [editor] = useLexicalComposerContext();
	
	const handleInsertHeading = () => {
		editor.dispatchCommand(INSERT_HEADING_COMMAND, '새로운 제목 추가');
	};
	
	return <button onClick={handleInsertHeading}>Insert Heading</button>;
};

// 에디터 인스턴스를 외부로 노출하는 컴포넌트
const ExposeEditor = forwardRef((_, ref) => {
	const [editor] = useLexicalComposerContext();
	
	useImperativeHandle(ref, () => ({
		getHTML: () => {
			let html = '';
			editor.getEditorState().read(() => {
				html = $generateHtmlFromNodes(editor);
			});
			return html;
		},
		setHTML: (html: string) => {
			editor.update(() => {
				const parser = new DOMParser();
				const dom = parser.parseFromString(html, 'text/html');
				const nodes = $generateNodesFromDOM(editor, dom);
				const root = $getRoot();
				root.clear();
				root.append(...nodes);
			});
		},
		clearEditor: () => {
			editor.update(() => {
				const root = $getRoot();
				root.clear();
			});
		},
	}));
	
	return null;
});
