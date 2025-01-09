import { Suspense, lazy } from "react";

const Loading = <div className="loading-image"></div>;

// Lazy load components
const List = lazy(() => import("../pages/board/ListPage"));
const LostBoard = lazy(() => import("../pages/board/LostBoard"));
const FoundBoard = lazy(() => import("../pages/board/FoundBoard"));
const FreeBoard = lazy(() => import("../pages/board/FreeBoard"));

const boardRouter = () => {
    return [
        {
            path: "list",
            element: <Suspense fallback={Loading}><List /></Suspense>
        },
        {
            path: "lost",
            element: <Suspense fallback={Loading}><LostBoard /></Suspense>
        },
        {
            path: "found",
            element: <Suspense fallback={Loading}><FoundBoard /></Suspense>
        },
        {
            path: "free",
            element: <Suspense fallback={Loading}><FreeBoard /></Suspense>
        }
    ];
};

export default boardRouter;
