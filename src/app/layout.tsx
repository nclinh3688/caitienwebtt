import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PHÚC KHIÊM EDU - Học ngoại ngữ online",
  description: "Nền tảng học ngoại ngữ toàn diện với các khóa học tiếng Nhật, Trung, Anh, Hàn, Việt.",
};

import AuthProvider from "@/components/AuthProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          
          <main className="flex-1">
            {children}
          </main>
          
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}