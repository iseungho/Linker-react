import { Suspense, lazy } from "react";
import memberRouter from "./memberRouter";
import boardRouter from "./boardRouter";

const { createBrowserRouter } = require("react-router-dom");

const Loading = <div className="loading-image"></div>
const Main = lazy(() => import("../pages/MainPage"))

const root = createBrowserRouter([
    {
        path: "",
        element: <Suspense fallback={Loading}><Main /></Suspense>
    },
    {
        path: "member",
        children: memberRouter()
    },
    {
        path: "board",
        children: boardRouter()
    },
])

export default root;
