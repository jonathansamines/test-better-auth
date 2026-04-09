import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeSwitch } from "@/components/theme-switch";
import "./globals.css";

export const metadata: Metadata = {
  title: "Acme App",
  description: "Sign in with email, Google, or SSO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          {children}
          <ThemeSwitch />
        </ThemeProvider>
      </body>
    </html>
  );
}
