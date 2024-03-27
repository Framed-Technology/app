"use client";

import AuthMenu from "./auth-menu";
import SignUpButton from "./signup-button";
import { useSession  } from "next-auth/react";

type AuthButtonProps = {
  buttonText: string;
  icon?: React.ReactElement;
};

const AuthButton = ({ buttonText, icon }: AuthButtonProps) => {
  const { data: session } = useSession();
  return session ? <AuthMenu session={session} /> : <SignUpButton buttonText={buttonText} icon={icon}/>;
};

export default AuthButton;
