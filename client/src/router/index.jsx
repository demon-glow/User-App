import { Routes, Route } from "react-router-dom";
import UserPage from "../pages/user";
import DepartmentPage from "../pages/department";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/department" element={<DepartmentPage />} />
    </Routes>
  );
}

export default AppRouter;