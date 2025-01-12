import './App.css';
import { RouterProvider } from 'react-router-dom';
import root from "./router/root";
import NaverMapScriptLoader from "./util/NaverMapScriptLoader";

function App() {
  return (
      <>
        <NaverMapScriptLoader />
        <RouterProvider router={root} />
      </>
  );
}

export default App;
