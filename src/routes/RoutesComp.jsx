import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Layout from "../layout/layout.jsx";
import LoginPage from "../pages/loginPage.jsx";
import HomePage from "../pages/HomePage.jsx";
import UsersPage from "../pages/UsersPage.jsx";
import StudientManipulationPage from "../pages/StudientManipulationPage.jsx";
import StudentScholarshipPage from "../pages/StudentScholarshipPage.jsx";
import StrudentMarksManagmentPage from "../pages/StrudentMarksManagmentPage.jsx";

export const RoutesComp = () => {
  const token = useSelector((state) => state.auth.token);

  return (
    <Routes>
      {token ? (
        <>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/user-management" element={<UsersPage />} />
            <Route
              path="/remarks-management"
              element={<StrudentMarksManagmentPage />}
            />
            <Route
              path="/scholarship-management"
              element={<StudentScholarshipPage />}
            />
            <Route
              path="/studient-management"
              element={<StudientManipulationPage />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </>
      ) : (
        <Route>
          <Route element={<LoginPage />} path="/login" />
          <Route path="*" element={<Navigate to="/login" />} />
        </Route>
      )}
    </Routes>
  );
};
