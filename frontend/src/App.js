import "./index.css";
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
import Enroll from "./pages/enroll/enroll";
import Withdrawal from "./pages/withdrawal/withdrawal";
function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/enroll" element={<Enroll />} />
        <Route path="/withdraw" element={<Withdrawal />} />
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
