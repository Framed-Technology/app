import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";


const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: "500" });

const Header = () => {
  return (
    <header>
      <Flex
        pt={12}
        bg={"lily-white.100"}
        borderBottomColor={"black"}
        borderBottomWidth={2}
        justifyContent={"center"}
      >
        <Flex
          w={"full"}
          justifyContent={"space-between"}
          alignItems={"baseline"}
          mb={6}
          maxW={1060}
          px={4}
          m={"auto"}
        >
          <Logo />
          <Nav />
        </Flex>
      </Flex>
    </header>
  );
};

const Logo = () => (
  <Link href={"/"}>
    <Box position={"relative"}>
      <Image
        src={"platypus.svg"}
        height={100}
        width={100}
        alt="Magenta Platypus"
      />
      <Heading style={jetBrainsMono.style} color={"picton-blue.500"}>
        framed.
      </Heading>
    </Box>
  </Link>
);

const Nav = () => (
  <Box className="translate-y-6">
    <Flex gap={4}>
      <Link href={"/tools"}>
        <Button className="hover:scale-110" colorScheme="pink-salmon">Tools</Button>
      </Link>
      <Link href={"/articles"}>
        <Button className="hover:scale-110" colorScheme="pink-salmon">Articles</Button>
      </Link>
      <Link href={"/community"}>
        <Button className="hover:scale-110" colorScheme="pink-salmon">Community</Button>
      </Link>
    </Flex>
  </Box>
);

export default Header;
