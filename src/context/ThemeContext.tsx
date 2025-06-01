"use client"; 

import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type ThemeContextType = {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(true);

  function toggleTheme() {
    setDark(prev => !prev);
  }

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <html lang="pt-br" className={dark ? 'dark' : 'light'}>
        <body >
          {children}
        </body>
      </html>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro do ThemeProvider");
  }
  return context;
}