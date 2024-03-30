"use client";

import { ChakraProvider } from "@chakra-ui/react";
import theme from "@/theme";
import SessionProvider from "@/components/providers/SessionProvider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </SessionProvider>
  );
}