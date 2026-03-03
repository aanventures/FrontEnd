import Navigation from "@/component/Navigation/page";
import "./globals.css";
import Footer from "@/component/Footer";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navigation />
        {children} 
        <Footer />
      </body>
    </html>
  );
}
