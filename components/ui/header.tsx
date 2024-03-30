import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import Image from "next/image";
import React from "react";
import { JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import platypusLogo from "../../public/platypus.svg";
import { FaUser } from "react-icons/fa";
import AuthButton from "./auth/auth-button";

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
          maxW={1100}
          position={"relative"}
          px={4}
          m={"auto"}
          flexDir={{ base: "column", sm: "row" }}
        >
          <Logo />
          <Nav />
          <Flex
            gap={2}
            alignItems="center"
            right={0}
            top={0}
            position={"absolute"}
            px={4}
          >
            <AuthButton
              size="md"
              colorScheme="picton-blue"
              buttonText="Sign-in"
              rightIcon={<FaUser />}
            />
          </Flex>
        </Flex>
      </Flex>
    </header>
  );
};

const Logo = () => (
  <Link href={"/"}>
    <Box position={"relative"}>
      <Image
        src={platypusLogo}
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
      <Link href={"/courses"}>
        <Button colorScheme="hollywood" shadow="5px 5px 0 black">
          Courses
        </Button>
      </Link>
      <Link href={"/tools"}>
        <Button colorScheme="hollywood" shadow="5px 5px 0 black">
          Tools
        </Button>
      </Link>
      <Link href={"/community"}>
        <Button colorScheme="hollywood" shadow="5px 5px 0 black">
          Community
        </Button>
      </Link>
    </Flex>
  </Box>
);


export default Header;
