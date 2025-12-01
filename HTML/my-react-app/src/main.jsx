import './text.css';  // ← эта строка должна быть первой
import ReactDOM from "react-dom/client";
import './index.css'
import { router } from "./routes";
import { RouterProvider } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(

  <RouterProvider router={router} />


);