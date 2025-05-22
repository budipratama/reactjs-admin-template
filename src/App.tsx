import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect, JSX } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import MainLayout from "./layouts/MainLayout";
import NotFound from "./pages/NotFound";

const App = (): JSX.Element => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    console.log(
      "isLoggedIn",
      loggedIn,
      Math.floor(performance.now() * (100 - 1 + 1)) + 1
    );
    setIsLoggedIn(loggedIn);
  }, []);

  return (
    <Router>
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
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
