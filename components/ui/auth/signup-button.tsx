import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";
import { FaUser } from "react-icons/fa";

type SignInButtonProps = {
  buttonText: string;
  icon?: React.ReactElement;
};

const SignUpButton = ({ buttonText, icon} : SignInButtonProps) => {
  return (
    <Button
      onClick={() => signIn("google")}
      size={"sm"}
      colorScheme="picton-blue"
      rightIcon={icon}
    >
      {buttonText}
    </Button>
  );
};

export default SignUpButton;
