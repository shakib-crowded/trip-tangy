// app/layout.tsx
import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import { AuthProvider } from "@/context/AuthContext";

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "TripTangy - A Travel Company",
  description:
    "TripTangy is a newly aged travel company whose mission is to normalize the international travel for every travel enthusiast.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className={`${rubik.className} min-h-full flex flex-col`}>
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
