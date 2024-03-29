"use client";

import { Button, Flex } from "@chakra-ui/react";
import AuthMenu from "./auth-menu";
import SignUpButton from "./signup-button";
import { useSession } from "next-auth/react";
import Link from "next/link";

type AuthButtonProps = {
  buttonText: string;
  size: string;
  colorScheme: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

const AuthButton = ({
  buttonText,
  size,
  colorScheme,
  leftIcon,
  rightIcon,
}: AuthButtonProps) => {
  const { data: session } = useSession();
  return session ? (
    <AuthMenu session={session} />
  ) : (
    <Flex gap={2}>
      <SignUpButton
        size={size}
        colorScheme={colorScheme}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
      >
        {buttonText}
      </SignUpButton>
      <Link href={"/signup"}>
        <Button
          colorScheme="glowstone"
          flexDir={"row"}
          gap={2}
          px={2}
          size={size}
        >
          Sign-up
        </Button>
      </Link>
    </Flex>
  );
};

export default AuthButton;
