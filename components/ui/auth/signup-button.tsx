import { Button } from "@chakra-ui/react";
import { signIn } from "next-auth/react";

type SignInButtonProps = {
  buttonText: string;
  size: string;
  colorScheme: string;
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
};

const SignUpButton = ({
  buttonText,
  size,
  colorScheme,
  leftIcon,
  rightIcon,
}: SignInButtonProps) => {
  return (
    <Button
      onClick={() => signIn("google")}
      size={size}
      colorScheme={colorScheme}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
    >
      {buttonText}
    </Button>
  );
};

export default SignUpButton;
