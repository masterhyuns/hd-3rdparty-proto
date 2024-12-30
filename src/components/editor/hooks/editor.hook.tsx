import {useLexicalComposerContext} from "@lexical/react/LexicalComposerContext";
import {useImperativeHandle} from "react";
import {$generateHtmlFromNodes, $generateNodesFromDOM} from "@lexical/html";
import {$getRoot} from "lexical";

const useEditor = (ref: React.Ref<any>) => {
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
			console.log('Generated Nodes:');
			editor.update(() => {
				const parser = new DOMParser();
				const dom = parser.parseFromString(html, 'text/html');
				const nodes = $generateNodesFromDOM(editor, dom);
				const root = $getRoot();
				console.log('Generated Nodes:', nodes);
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
};
export default useEditor;