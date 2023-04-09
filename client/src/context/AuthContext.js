import { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  async function loadUser() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/me", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setUser(data.user);
      setIsAuthenticated(true);
      setIsLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    loadUser();
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        setIsAuthenticated,
        logout,
        loadUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
