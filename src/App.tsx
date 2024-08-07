import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "./routes";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer position="bottom-right" />
    </>
  );
};

export default App;
