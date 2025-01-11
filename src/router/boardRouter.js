import { Suspense, lazy } from "react";

const Loading = <div className="loading-image"></div>;

// Lazy load components
const LostBoard = lazy(() => import("../pages/board/LostBoard"));
const FoundBoard = lazy(() => import("../pages/board/FoundBoard"));
const FreeBoard = lazy(() => import("../pages/board/FreeBoard"));
const EachPost = lazy(() => import("../pages/eachpost/EachPost"))
const FoundWrite = lazy(() => import("../pages/board/FoundWritePage"));

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
        }
    ];
};

export default boardRouter;
