"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "@/data/query-client";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const queryClient = getQueryClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors closeButton />
        {children}
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools client={queryClient} initialIsOpen={false} buttonPosition="bottom-right" />
        ) : null}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
