import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { JSX } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ModalProvider } from "./context/ModalContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import MaintenanceWatcherWrapper from "./hooks/MaintenanceWatcherWrapper";

const AppRoutes = (): JSX.Element => {
  const { isLoggedIn } = useAuth();
  return (
    <Routes>
      <Route
        path='/'
        element={isLoggedIn ? <Navigate to='/dashboard' /> : <Login />}
      />
      <Route
        path='/dashboard'
        element={
          isLoggedIn ? (
            <MainLayout>
              <Dashboard />
            </MainLayout>
          ) : (
            <Navigate to='/' />
          )
        }
      />
      <Route
        path='/profile'
        element={
          isLoggedIn ? (
            <MainLayout showBreadcrumb={false}>
              <Profile />
            </MainLayout>
          ) : (
            <Navigate to='/profile' />
          )
        }
      />
      <Route path='/maintenance' element={<Maintenance />} />
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

const App = (): JSX.Element => {
  return (
    <AuthProvider>
      <Router>
        <ModalProvider>
          <MaintenanceWatcherWrapper />
          <AppRoutes />
        </ModalProvider>
      </Router>
    </AuthProvider>
  );
};

export default App;
