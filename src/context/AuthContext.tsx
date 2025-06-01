import {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  ReactNode,
} from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  setIsLoggedIn: (v: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);
  const value = useMemo(
    () => ({ isLoggedIn, setIsLoggedIn }),
    [isLoggedIn, setIsLoggedIn]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
