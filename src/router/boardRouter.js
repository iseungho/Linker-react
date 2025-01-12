import { Suspense, lazy } from "react";
import CommentComponents from "../components/board/comment/CommentComponents";

const Loading = <div className="loading-image"></div>;

// Lazy load components
const LostBoard = lazy(() => import("../pages/board/Lost/LostBoard"));
const FoundBoard = lazy(() => import("../pages/board/Found/FoundBoard"));
const FreeBoard = lazy(() => import("../pages/board/Free/FreeBoard"));
const EachPost = lazy(() => import("../pages/eachPost/EachPost"));
const FoundWrite = lazy(() => import("../pages/board/Found/FoundWritePage"));
const FreeWrite = lazy(() => import("../pages/board/Free/FreeWritePage"));
const LostWrite = lazy(() => import("../pages/board/Lost/LostWritePage"));
const FoundModify = lazy(() => import("../pages/board/Found/FoundModifyPage"));
const FreeModify = lazy(() => import("../pages/board/Free/FreeModifyPage"));
const LostModify = lazy(() => import("../pages/board/Lost/LostModifyPage"));


const boardRouter = () => {
    return [
        {
            path: "lost",
            element: <Suspense fallback={Loading}><LostBoard /></Suspense>
        },
        {
            path: "found",
            element: <Suspense fallback={Loading}><CommentComponents postId={1} /></Suspense>,
        },
        // {
        //     path: "found",
        //     element: <Suspense fallback={Loading}><FoundBoard /></Suspense>,
        // },
        {
            path: "found/:pno",
            element: <Suspense fallback={Loading}>
                <EachPost/>
            </Suspense>,
        },
        {
            path: "lost/:pno",
            element: <Suspense fallback={Loading}>
                <EachPost/>
            </Suspense>,
        },
        {
            path: "free/:pno",
            element: <Suspense fallback={Loading}>
                <EachPost/>
            </Suspense>,
        },
        {
            path: "free",
            element: <Suspense fallback={Loading}><FreeBoard /></Suspense>
        },
        {
            path: "found/write",
            element: <Suspense fallback={Loading}><FoundWrite /></Suspense>
        },
        {
            path: "free/write",
            element: <Suspense fallback={Loading}><FreeWrite /></Suspense>
        },
        {
            path: "lost/write",
            element: <Suspense fallback={Loading}><LostWrite /></Suspense>
        },
        {
            path: "found/modify/:pno",
            element: <Suspense fallback={Loading}><FoundModify /></Suspense>
        },
        {
            path: "free/modify/:pno",
            element: <Suspense fallback={Loading}><FreeModify /></Suspense>
        },
        {
            path: "lost/modify/:pno",
            element: <Suspense fallback={Loading}><LostModify /></Suspense>
        },
    ];
};

export default boardRouter;
