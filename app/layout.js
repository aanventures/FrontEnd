import Navigation from "@/component/Navigation/page";
import Footer from "@/component/Footer";
import "./globals.css";
import { Montserrat } from "next/font/google";
// 1. Import the Provider and the Auth Initializer
import { StoreProvider } from "@/store/StoreProvider";
import AuthInitializer from "@/component/AuthInitializer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"], // Select the weights you need
  variable: "--font-montserrat", // Define a CSS variable name
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-montserrat antialiased`}>
        {/* 2. Wrap the entire app in the Redux Store */}
        <StoreProvider>
          
          {/* 3. This triggers loadUser() to check your HTTP-only cookie on refresh */}
          <AuthInitializer />

          <Navigation />
          <main>{children}</main>
          <Footer />
          
        </StoreProvider>
      </body>
    </html>
  );
}