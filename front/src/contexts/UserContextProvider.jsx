import { useState, useEffect } from "react";
import axios from "axios";
import UserContext from "./UserContext";

const API_URL = import.meta.env.VITE_API_URL;
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/me`, {
          withCredentials: true,
        });
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser, error, setError }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
