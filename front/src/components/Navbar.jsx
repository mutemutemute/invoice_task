import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import Profile from "../assets/profile.jpg";
import { BiSolidCircleThreeQuarter } from "react-icons/bi";
import UserContext from "../contexts/UserContext";

const API_URL = import.meta.env.VITE_API_URL;

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const logout = async () => {
    try {
      await axios.get(`${API_URL}/users/logout`, { withCredentials: true });

      setUser(null);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          setError(
            error.response.data.message ||
              "An error occurred, please try again."
          );
        } else if (error.request) {
          setError("No response from server. Check internet connection.");
        } else {
          setError("Something went wrong. Please try again.");
        }
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <aside className="w-full lg:w-20 h-16 lg:h-screen bg-gray-900 flex items-center lg:flex-col justify-between px-6 lg:py-6 fixed top-0 left-0 z-50">
      <div className="bg-indigo-500 w-15 h-15 rounded-lg flex items-center justify-center">
        <BiSolidCircleThreeQuarter className="text-white w-10 h-10" />
      </div>

      {user && (
        <div className="relative" onBlur={() => setIsDropdownOpen(false)}>
          <div
            className="w-10 h-10 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <img
              src={Profile}
              alt="Profile"
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full lg:left-12 lg:top-0 mt-2 w-32 bg-white shadow-lg rounded-lg overflow-hidden">
              <button
                className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-200"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </aside>
  );
};

export default Navbar;
