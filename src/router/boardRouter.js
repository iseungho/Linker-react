import { Suspense, lazy } from "react";

const Loading = <div className="loading-image"></div>;

// Lazy load components
const LostBoard = lazy(() => import("../pages/board/Lost/LostBoard"));
const FoundBoard = lazy(() => import("../pages/board/Found/FoundBoard"));
const FreeBoard = lazy(() => import("../pages/board/Free/FreeBoard"));
const EachPost = lazy(() => import("../pages/eachPost/EachPost"));
const FoundWrite = lazy(() => import("../pages/board/Found/FoundWritePage"));
const FreeWrite = lazy(() => import("../pages/board/Free/FreeWritePage"));
const LostWrite = lazy(() => import("../pages/board/Lost/LostWritePage"));
const Modify = lazy(() => import("../pages/board/ModifyPage"));


const boardRouter = () => {
    return [
        {
            path: "lost",
            element: <Suspense fallback={Loading}><LostBoard /></Suspense>
        },
        {
            path: "found",
            element: <Suspense fallback={Loading}><FoundBoard /></Suspense>,
        },
        {
            path: "free",
            element: <Suspense fallback={Loading}><FreeBoard /></Suspense>
        },
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
            path: "modify/:pno",
            element: <Suspense fallback={Loading}><Modify /></Suspense>
        },
    ];
};

export default boardRouter;
