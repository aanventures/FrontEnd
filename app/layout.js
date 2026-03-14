import Navigation from "@/component/Navigation/page";
import Footer from "@/component/Footer";
import "./globals.css";

// 1. Import the Provider and the Auth Initializer
import { StoreProvider } from "@/store/StoreProvider";
import AuthInitializer from "@/component/AuthInitializer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
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