import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Framed.",
  description: "Context for Young Investors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={outfit.className}>
        <Providers>
          <Flex flexDir={"column"} w={"full"}>
            <Header />
            <main className="max-w-[1060px] m-auto px-4 pt-[50px] lg:pt-[100px] pb-4 w-full">
              {children}
              <SpeedInsights />
            </main>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
