import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, JSX } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";
import Maintenance from "./pages/Maintenance";
import MaintenanceWatcherWrapper from "./hooks/MaintenanceWatcherWrapper";

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);
  console.log("isLoggedIn:", isLoggedIn);
  return (
    <Router>
      <MaintenanceWatcherWrapper />
      <Routes>
        <Route
          path='/'
          element={
            isLoggedIn ? (
              <Navigate to='/dashboard' />
            ) : (
              <Login setIsLoggedIn={setIsLoggedIn} />
            )
          }
        />
        <Route
          path='/dashboard'
          element={
            isLoggedIn ? (
              <MainLayout>
                <Dashboard setIsLoggedIn={setIsLoggedIn} />
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
              <MainLayout>
                <Profile setIsLoggedIn={setIsLoggedIn} />
              </MainLayout>
            ) : (
              <Navigate to='/profile' />
            )
          }
        />
        <Route path='/maintenance' element={<Maintenance />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
