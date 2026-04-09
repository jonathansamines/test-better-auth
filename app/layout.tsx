import type { Metadata } from "next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { InfrastructureWrapper } from "@/components/infrastructure/wrapper";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Better Auth",
  description: "Official-style demo: email, Google, and enterprise SSO with Better Auth.",
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
          <InfrastructureWrapper>{children}</InfrastructureWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
