import { Blinker } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import { PageContextProvider } from "@/contexts/PageContext";

const blinker = Blinker({
  variable: "--font-blinker",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "600", "700", "800"],
});

const bolde = localFont({
  src: [
    {
      path: "../fonts/BOLDE.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-bolde",
});

export const metadata = {
  title: "OlympicHub 2025",
  description: "Plataforma de información olímpica",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${blinker.variable} ${bolde.variable} antialiased bg-gradient-to-b from-black to-[#dac07d] text-[#fefcf4] min-h-screen flex flex-col`}
      >
        <PageContextProvider>
          <Navbar />
          <Sidebar />
          <main className="pt-20 w-full flex-1 relative flex flex-col">
            <div className="w-full max-w-[1600px] mx-auto flex-1">
              {children}
            </div>
          </main>
          <Footer />
        </PageContextProvider>
      </body>
    </html>
  );
}
