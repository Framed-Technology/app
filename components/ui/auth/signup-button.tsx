"use client"

import { Button, ButtonProps } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

const SignUpButton = (props: Omit<ButtonProps, "onClick">) => {
  return <Button onClick={() => signIn("google")} {...props} />;
};

export default SignUpButton;
