"use client";

import React from "react";
import {
  Avatar,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Flex,
  Text,
  Box,
  Button,
  Divider,
  MenuDivider,
  Link,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { FaArrowLeft, FaUser } from "react-icons/fa";

type Props = {
  session: Session;
};

const AuthMenu = ({ session }: Props) => {
  return (
    <Flex justifyContent={"center"} alignItems={"center"} gap={4}>
      <Menu>
        <MenuButton
          as={Box}
          h="full"
          cursor={"pointer"}
          border={2}
          borderColor={"lily-white.200"}
          _hover={{ bg: "lily-white.50" }}
          py={2}
          px={4}
          rounded={"md"}
        >
          <Flex
            flexDir={"row"}
            gap={2}
            rounded="md"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <Text display={{ base: "none", md: "block" }} size={"sm"}>
              {session.user?.name}
            </Text>
            <Avatar
              ring={3}
              ringColor={"white"}
              cursor={"pointer"}
              size={"sm"}
              src={session.user?.image!}
              name={session.user?.name ?? "Unkown user"}
            />
          </Flex>
        </MenuButton>
        <MenuList>
          <Link href="/user/details">
            <MenuItem textAlign={"right"} icon={<FaUser />}>
              Details
            </MenuItem>
          </Link>
          <MenuDivider />
          <MenuItem
            color={"red"}
            textAlign={"right"}
            icon={<FaArrowLeft />}
            onClick={() => signOut()}
          >
            Logout
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default AuthMenu;
