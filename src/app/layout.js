import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./components/AuthProvider";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ProductHub - Your Shopping Destination",
  description:
    "Discover amazing products at unbeatable prices. Electronics, accessories, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Navbar />
            <main>{children}</main>
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: "#363636",
                  color: "#fff",
                },
              }}
            />
            {/* Footer */}
            <Footer />
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}