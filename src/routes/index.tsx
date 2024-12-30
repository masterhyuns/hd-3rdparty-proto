import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home";
import TanStack from "./pages/Tanstack";
import AgGrid from "./pages/AgGrid";
import RealGrid from "./pages/RealGrid";
import {UploadProvider} from "../components/uploader/TusProvider";
import TuiGrid from "./pages/TuiGrid";
import Lexical from "./pages/Lexical";
import Scorm from "./pages/Scorm";
const router = createBrowserRouter([{
	path: "/",
	element: <Home/>
},{
	path: "/tanstack",
	element: <TanStack/>
},{
	path: "/aggrid",
	element: <AgGrid/>
},{
	path: "/realgrid",
	element: <RealGrid/>
},{
	path: "/tuigrid",
	element: <TuiGrid/>
},{
	path: "/lexical",
	element: <Lexical/>
},{
	path: "/ttt",
	element: <Scorm/>
}])

export default function Router(){
	return <UploadProvider><RouterProvider router={router}/></UploadProvider>
}