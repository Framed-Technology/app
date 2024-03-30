import { Flex } from "@chakra-ui/react";
import platypusLogo from "../../public/platypus.svg";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <Flex
      flexDir={"column"}
      h={200}
      gap={2}
      bg={"lily-white.100"}
      borderTopWidth={2}
      borderColor={"black"}
      justifyContent={"center"}
      alignItems={"center"}
      position={"relative"}
    >
      <Image
        src={platypusLogo}
        height={100}
        width={100}
        alt="Magenta Platypus"
      />
      <Flex gap={4}>
        <Link className="hover:underline" href={"/about"}>
          About
        </Link>
        •
        <Link className="hover:underline" href={"/blog"}>
          Blog
        </Link>
        •
        <Link className="hover:underline" href={"/contact"}>
          Contact
        </Link>
        •
        <Link className="hover:underline" href={"/legal"}>
          Legal
        </Link>
      </Flex>
    </Flex>
  );
};

export default Footer;
