import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import { ChangePasswordPage } from "../features/auth/pages/ChangePasswordPage";
import { AuthGuard } from "../features/auth/components/AuthGuard";
import { ResetPasswordPage } from "../features/auth/pages/ResetPasswordPage";
import { ForgotPasswordPage } from "../features/auth/pages/ForgotPasswordPage";

function HomePage() {
  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="text-3xl font-bold">
        HRMS Dashboard
      </h1>
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="min-h-screen bg-background p-8 text-foreground">
      <h1 className="text-3xl font-bold">
        HRMS Dashboard
      </h1>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
      <h1 className="text-2xl font-bold">
        Page Not Found
      </h1>
    </div>
  );
}

export function AppRoutes() {
    return (
        <BrowserRouter>
      <Routes>
        {/* Public routes */}

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPasswordPage />}
        />

        <Route
          path="/reset-password"
          element={<ResetPasswordPage />}
        />

        {/* Protected routes */}

        <Route element={<AuthGuard />}>
          <Route
            path="/"
            element={<DashboardPage />}
          />

          <Route
            path="/change-password"
            element={<ChangePasswordPage />}
          />
        </Route>

        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
    )
}