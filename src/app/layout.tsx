import { ThemeProvider } from "./context/ThemeContext";
import "./globals.css";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
