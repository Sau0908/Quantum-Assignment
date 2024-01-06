import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

import AllRoutes from "./Routes/AllRoutes";
import { AuthProvider } from "./AuthContext";

function App() {
  return (
    <>
      <AuthProvider>
        <AllRoutes />
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
