import { useState, useEffect } from "react";
import ThemeContext from "./ThemeContext.jsx";
 
const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  useEffect(()=>{
    setTheme(document.documentElement.attributes.getNamedItem('data-theme').nodeValue);
    document.documentElement.className = theme;
  },[])
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.className = theme;
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
 
export default ThemeContextProvider;