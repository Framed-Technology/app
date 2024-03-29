"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import { deleteUserByEmail } from "./action";
import { Button } from "@chakra-ui/react";

const Details = () => {
  const { data: session } = useSession(); // this should read from the db, not the sesssion.
  const handleDeleteUser = async () => {
    if (session?.user?.email) {
      await deleteUserByEmail(session.user.email);
      await signOut()
      window.location.href = "/"
      alert("Your user data has been removed from the server, trust me");
    }
  };
  return (
    <Button colorScheme={"red"} onClick={handleDeleteUser}>
      Delete User
    </Button>
  );
};

export default Details;
