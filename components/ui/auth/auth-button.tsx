"use client";

import AuthMenu from "./auth-menu";
import SignUpButton from "./signup-button";
import { useSession  } from "next-auth/react";

const AuthButton = () => {
  const { data: session } = useSession();
  return session ? <AuthMenu session={session} /> : <SignUpButton />;
};

export default AuthButton;
