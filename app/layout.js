import Navigation from "@/component/Navigation/page";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children} 
      </body>
    </html>
  );
}
