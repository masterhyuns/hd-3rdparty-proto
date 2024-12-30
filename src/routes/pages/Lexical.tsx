import React, {useEffect, useRef} from "react";
import Editor from "../../components/editor";

const Lexical = () => {
	const ref = useRef<{
		getHTML: () => string;
		setHTML: (html: string) => void;
		clearEditor: () => void;
	}>(null);
	
	const handleGetHTML = () => {
		if (ref.current) {
			const html = ref.current.getHTML();
			console.log('Generated HTML:', html);
		}
	};
	
	const handleSetHTML = () => {
		if (ref.current) {
			const html = `<h1 class="PlaygroundEditorTheme__h1" dir="ltr"><span style="white-space: pre-wrap;">안녕하세요</span></h1><h1 class="PlaygroundEditorTheme__h1" dir="ltr"><span style="white-space: pre-wrap;">안녕하세요</span></h1><p class="PlaygroundEditorTheme__paragraph" dir="ltr"><span style="white-space: pre-wrap;">이것은 서버에서 가져온 콘텐츠입니다.</span></p><iframe data-lexical-video="https://www.youtube.com/watch?v=y8JsePh2kjs" src="https://www.youtube.com/watch?v=y8JsePh2kjs" frameborder="0" allowfullscreen="true" title="Embedded video"></iframe>`;
			ref.current.setHTML(html);
		}
	};
	
	const handleClearEditor = () => {
		if (ref.current) {
			ref.current.clearEditor();
		}
	};
	
	useEffect(() => {
		handleSetHTML()
	}, [])
	
	return (
		<div>
			<h1>Lexical Editor</h1>
			<button onClick={handleGetHTML}>Get HTML</button>
			<button onClick={handleSetHTML}>Set HTML</button>
			<button onClick={handleClearEditor}>Clear Editor</button>
			<Editor ref={ref}/>
		</div>
	);
};

export default Lexical;
