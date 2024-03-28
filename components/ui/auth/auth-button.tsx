"use client";

import AuthMenu from "./auth-menu";
import SignUpButton from "./signup-button";
import { useSession } from "next-auth/react";

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
    <SignUpButton
      buttonText={buttonText}
      size={size}
      colorScheme={colorScheme}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
    />
  );
};

export default AuthButton;
