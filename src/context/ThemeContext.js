import React, {useState, useEffect} from 'react';
import {useContext} from 'react';

const ThemeContext = React.createContext();

export function useToggleMode() {
  return useContext(ThemeContext);
}

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');
  const [isDark, setIsDark] = useState(false);

  const [colors, setColors] = useState({
    background: '#faefef',
    text: '#000000',
    post: '#e7e7e7',
    detailes: '#838181',
    separator: 'rgba(131, 129, 129, 0.01)',
  });

  const toggleTheme = () => {
    let background = '#121212';
    let text = '#faefef';
    let post = '#323232';
    let details = '#beb9b9';
  
    if (isDark) {
      background = '#faefef';
      text = '#000000';
      post = '#e7e7e7';
      details = '#838181';
    }
    
    setColors({
      background: background,
      text: text,
      post: post,
      detailes: details,
      separator: 'rgba(131, 129, 129, 0.01)',
    });
    

    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{isDark, toggleTheme, colors}}>
      {children}
    </ThemeContext.Provider>
  );
};
