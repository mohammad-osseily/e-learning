import "./App.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home/home";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
      </>
    )
  );

  return (
    <div className="App">
      <ToastContainer position="top-right"></ToastContainer>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
