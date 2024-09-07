"use client";
import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [UserData, setUserData] = useState({
    id: null,
    username: "",
    avatar: "",
    first_name: "",
    last_name: "",
    password: "",
    TFA: false,
  });


  const setUserInfos = async (access) => {
    console.log(`Bearer ${access}`);
    
    try {
      const res = await axios.get("http://localhost:8000/api/users/me/", {
        headers: {
          Authorization: `Bearer ${access}`, 
        },
      });
      updateUserData({id: res.data.id, username: res.data.username ,avatar: res.data.avatar ,first_name: res.data.first_name, last_name: res.data.last_name})
    } catch (err) {
      console.error("Error response:", err.response); 
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const access = localStorage.getItem('access');
    setUserInfos(access);

  }, []);

  const updateUserData = (data) => {
    setUserData(data);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <UserContext.Provider value={{ UserData, updateUserData }}>
      {children}
    </UserContext.Provider>
  );
};
