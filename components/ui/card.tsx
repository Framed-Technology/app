import { colors } from "@/theme";
import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

type CardProps = {
  variant?: "whiteShadow" | "locked" | "active" | "gradient";
} & FlexProps;

const Card = (props: CardProps) => {
  const { variant, ...rest } = props;
  switch (variant) {
    case "whiteShadow":
      return <WhiteShadow {...rest} />;
    case "locked":
      return <Locked {...rest} />;
    case "active":
      return <Active {...rest} />;
    case "gradient":
      return <Gradient {...rest} />;
    default:
      return (
        <Flex
          bg={"lily-white.100"}
          borderWidth={1}
          borderColor={"black"}
          p={4}
          flexDir={"column"}
          {...rest}
        />
      );
  }
};

const WhiteShadow = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      bg={"white"}
      shadow={"5px 5px 0 black"}
      borderWidth={1}
      borderColor={"black"}
      p={4}
      flexDir={"column"}
      {...rest}
    />
  );
};

const Locked = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      bg={"hollywood.50"}
      opacity={0.5}
      borderWidth={1}
      borderColor={"black"}
      p={4}
      flexDir={"column"}
      {...rest}
    />
  );
};

const Active = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      bg={"lily-white.100"}
      shadow={"5px 5px 0 black"}
      borderWidth={1}
      borderColor={"black"}
      p={4}
      flexDir={"column"}
      {...rest}
    />
  );
};

const Gradient = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      bg="linear-gradient(90deg, rgba(111,84,162,1) 0%, rgba(178,118,203,1) 50%, rgba(220,42,145,1) 100%)"
      borderWidth={1}
      borderColor={"black"}
      p={4}
      flexDir={"column"}
      {...rest}
    />
  );
};

export default Card;
