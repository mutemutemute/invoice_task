import { useContext } from "react";
import ThemeContext from "../contexts/ThemeContext.jsx";
import { FaSun, FaMoon } from "react-icons/fa";

const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleDarkMode = () => {
    if (theme === "dark") setTheme("light");
    else setTheme("dark");
  };

  return (
    <>
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          className="sr-only peer"
          onChange={toggleDarkMode}
          defaultChecked={theme === "dark"}
        />
        <div
          className="relative w-11 h-6 bg-gray-700 dark:bg-gray-200
                peer-focus:outline-none peer-focus:ring-4 rounded-full peer
                peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full
                peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px]
                after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5
                after:transition-all"
        >
          <div className="flex justify-around h-full items-center">
            <FaMoon className="!text-gray-700" />
            <FaSun className="!text-gray-200" />
          </div>
        </div>
        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300"></span>
      </label>
    </>
  );
};

export default ThemeButton;
