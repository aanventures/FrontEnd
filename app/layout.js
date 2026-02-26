import Navigation from "@/component/Navigation/page";

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
