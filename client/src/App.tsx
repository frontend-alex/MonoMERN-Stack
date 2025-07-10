import Loading from "@/components/Loading";
import TitleWrapper from "@/components/TitleWrapper";
import AuthLayout from "@/components/layouts/AuthLayout";
import RootLayout from "@/components/layouts/RootLayout";

import { Suspense } from "react";
import { Dashboard } from "@/routes/(root)";
import { Route, Routes } from "react-router-dom";
import { LandingPage, Login, Otp, Register } from "@/routes/(auth)";

const App = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <TitleWrapper title="Landing Page">
              <LandingPage />
            </TitleWrapper>
          }
        />
        <Route element={<AuthLayout />}>
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
          <Route
            path="/verify-email"
            element={
              <TitleWrapper title="Verify Email">
                <Otp />
              </TitleWrapper>
            }
          />
        </Route>
        <Route element={<RootLayout />}>
          <Route
            path="/dashboard"
            element={
              <TitleWrapper title="Dashboard Page">
                <Dashboard />
              </TitleWrapper>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
