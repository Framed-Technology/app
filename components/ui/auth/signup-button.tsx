import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaUser } from "react-icons/fa";

const SignUpButton = () => {
  return (
    <Button
      onClick={() => signIn("google")}
      size={"sm"}
      colorScheme="picton-blue"
      rightIcon={<FaUser />}
    >
      Sign-in
    </Button>
  );
};

export default SignUpButton;
