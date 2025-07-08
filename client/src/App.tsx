import TitleWrapper from "./components/TitleWrapper";
import AuthLayout from "./components/layouts/AuthLayout";

import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { LandingPage, Login, Register } from "./routes/(auth)";

const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/"
            element={
              <TitleWrapper title="Landing Page">
                <LandingPage />
              </TitleWrapper>
            }
          />
          <Route
            path="/login"
            element={
              <TitleWrapper title="Login Page">
                <Login />
              </TitleWrapper>
            }
          />
          <Route
            path="/register"
            element={
              <TitleWrapper title="Register Page">
                <Register />
              </TitleWrapper>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
