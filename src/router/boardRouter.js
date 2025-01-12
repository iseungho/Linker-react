import { Suspense, lazy } from "react";

const Loading = <div className="loading-image"></div>;

// Lazy load components
const LostBoard = lazy(() => import("../pages/board/LostBoard"));
const FoundBoard = lazy(() => import("../pages/board/FoundBoard"));
const FreeBoard = lazy(() => import("../pages/board/FreeBoard"));
const EachPost = lazy(() => import("../pages/eachpost/EachPost"))
const FoundWrite = lazy(() => import("../pages/board/FoundWritePage"));
const FreeWrite = lazy(() => import("../pages/board/FreeWritePage"));
const LostWrite = lazy(() => import("../pages/board/LostWritePage"));
const FoundModify = lazy(() => import("../pages/board/FoundModifyPage"));
const FreeModify = lazy(() => import("../pages/board/FreeModifyPage"));
const LostModify = lazy(() => import("../pages/board/LostModifyPage"));


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
        // {
        //     path: "found",
        //     element: <Suspense fallback={Loading}><EachPost/></Suspense>,
        // },
        // {
        //     path: "posting/:pno",
        //     element: <Suspense fallback={Loading}>
        //         <EachPost/>
        //     </Suspense>,
        // },
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
