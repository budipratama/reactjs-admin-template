import {
  createContext,
  useContext,
  useState,
  useMemo,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
  isLockScreen: boolean;
  setIsLockScreen: (v: boolean) => void;
  username: string | null;
  setUsername: (v: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [isLockScreen, setIsLockScreen] = useState(() => {
    return localStorage.getItem("isLockScreen") === "true";
  });
  const [username, setUsername] = useState<string | null>(() => {
    return localStorage.getItem("username") || null;
  });

  // Sync ke localStorage setiap kali berubah
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn ? "true" : "false");
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem("isLockScreen", isLockScreen ? "true" : "false");
  }, [isLockScreen]);

  useEffect(() => {
    if (username) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }
  }, [username]);

  const value = useMemo(
    () => ({
      isLoggedIn,
      setIsLoggedIn,
      username,
      setUsername,
      isLockScreen,
      setIsLockScreen,
    }),
    [
      isLoggedIn,
      setIsLoggedIn,
      username,
      setUsername,
      isLockScreen,
      setIsLockScreen,
    ]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
