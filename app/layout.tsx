import type { Metadata } from "next";
import { Open_Sans as OpenSansFont} from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/ui/header";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "@/components/ui/footer";
import Script from "next/script";

export const OpenSans = OpenSansFont({ subsets: ["latin"] });

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
      <head>
        <Script
          src={`https://app.termly.io/resource-blocker/3d896551-04f9-41db-90da-88f68eb18dc6?autoBlock=on`}
        />
      </head>
      <body className={OpenSans.className}>
        <Providers>
          <Flex flexDir={"column"} w={"full"} minH={"100vh"}>
            <Header />
            <div className="flex-1 h-full max-w-[1100px] black m-auto px-4 py-[70px] lg:py-[100px] w-full">
              {children}
              <SpeedInsights />
            </div>
            <Footer />
          </Flex>
        </Providers>
      </body>
    </html>
  );
}
