import { createContext, useContext, useEffect, useState } from "react";

import axios from "axios";

const UserContext = createContext();


export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(true);


  

  //Always include cookies in requests
  axios.defaults.withCredentials = true;

  // Verify user from backend using stored cookie
  // const verifyUser = async () => {
  //   try {
  //     const res = await axios.get("https://checkinn-rh1m.onrender.com/auth/user/verify");
  //     if (res.data?.user) {
  //       setUser(res.data.user);
  //       setRole(res.data.user.role || "user");
  //     } else {
  //       setUser(null);
  //     }
  //   } catch (err) {
  //    if (err.response?.status === 401) {

  //     setUser(null);
  //   }  else {
  //     console.error("Unexpected auth error:", err);
  //   }
  // }finally {
  //     setLoading(false);
  //   }
  // };

  const verifyUser = async () => {
  try {
    const res = await axios.get("https://checkinn-rh1m.onrender.com/auth/user/verify");
    setUser(res.data.user);
    setRole(res.data.user?.role || "user");
  } catch (err) {
    if (!err.silent) {
      console.error("Unexpected auth error:", err);
    }
    setUser(null);
  } finally {
    setLoading(false);
  }
};


  //  Call verification once when app starts
  useEffect(() => {
    verifyUser();
  }, []);

  // Logout function
  const logout = async () => {
    try {
      await axios.post("https://checkinn-rh1m.onrender.com/auth/user/logout");
      setUser(null);
      setRole("user");
      
      
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <h2 className="text-lg font-semibold">Loading...</h2>
      </div>
    );
  }

  return (
    <UserContext.Provider value={{ user, setUser, role, setRole, verifyUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
