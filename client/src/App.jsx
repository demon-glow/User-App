import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router";
import Navbar from "./components/navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="flex">
        <Navbar />
        <div className="flex-1 p-6">
          <AppRouter />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;