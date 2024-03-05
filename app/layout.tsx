import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import { SpeedInsights } from "@vercel/speed-insights/next";

const outfit = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "framed.",
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
            <div className="max-w-[1200px] m-auto px-4 pt-[70px] lg:pt-[100px] pb-4 w-full">
              {children}
              <SpeedInsights />
            </div>
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
