import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import Navbar from "./components/navbar";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Toaster position="top-right" reverseOrder={false} />
        <Navbar />
        <div className="flex-1 p-6">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;