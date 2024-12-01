import React, { useState,useEffect } from 'react';
import { useContext } from 'react';

const ThemeContext = React.createContext();
  
  export function useToggleMode() {
    return useContext(ThemeContext);
  }
  

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isDark, setIsDark] = useState(false);
  
  const [colors, setColors] = useState(
    {
      background: '#faefef',
      text: '#000000',
      post: '#e7e7e7',
      detailes:"#838181",
      separator:"rgba(131, 129, 129, 0.01)"
    }
);
  

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setColors({
        background: '#121212',
        text: '#faefef',
        post: '#323232',
        details:"#beb9b9",
        separator:"rgba(131, 129, 129, 0.01)"
      })
    } else {  
      setTheme('light');
      setColors({
        background: '#faefef',
        text: '#000000',
        post: '#e7e7e7',
        detailes:"#838181",
        separator:"rgba(131, 129, 129, 0.01)"
      })
    }
    
    setIsDark(!isDark);
  };


  return (
    <ThemeContext.Provider value={{ isDark,toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};
