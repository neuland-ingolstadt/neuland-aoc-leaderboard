import type { Metadata } from "next";
import { Sora, Azeret_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { ThemeProvider } from "@/src/components/theme-provider";

const sora = Sora({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-sora",
});

const azeret = Azeret_Mono({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
  variable: "--font-azeret",
});

export const metadata: Metadata = {
  title: "Neuland Leaderboard: Advent Of Code",
  icons: {
    icon: "/img/neuland_icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sora.variable} ${azeret.variable} font-sora`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"light"}
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
