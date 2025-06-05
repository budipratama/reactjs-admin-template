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
import LockScreen from "./pages/LockScreen";
import AccountSettings from "./pages/AccountSettings";
function getProtectedElement(
  isLockScreen: boolean,
  isLoggedIn: boolean,
  element: JSX.Element
) {
  if (isLockScreen) return <Navigate to='/lock-screen' />;
  if (isLoggedIn) return element;
  return <Navigate to='/' />;
}

const AppRoutes = (): JSX.Element => {
  const { isLoggedIn, isLockScreen } = useAuth();
  return (
    <Routes>
      <Route
        path='/'
        element={isLoggedIn ? <Navigate to='/profile' /> : <Login />}
      />
      <Route
        path='/dashboard'
        element={getProtectedElement(
          isLockScreen,
          isLoggedIn,
          <MainLayout>
            <Dashboard />
          </MainLayout>
        )}
      />
      <Route
        path='/lock-screen'
        element={
          isLockScreen ? (
            <LockScreen />
          ) : isLoggedIn ? (
            <Navigate to='/profile' />
          ) : (
            <Navigate to='/' />
          )
        }
      />
      <Route
        path='/profile'
        element={getProtectedElement(
          isLockScreen,
          isLoggedIn,
          <MainLayout showBreadcrumb={false}>
            <Profile />
          </MainLayout>
        )}
      />
      <Route
        path='/account-settings'
        element={getProtectedElement(
          isLockScreen,
          isLoggedIn,
          <MainLayout showBreadcrumb={false}>
            <AccountSettings />
          </MainLayout>
        )}
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
