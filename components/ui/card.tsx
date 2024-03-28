import { colors } from "@/theme";
import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

type CardProps = {
  variant?: "whiteShadow" | "purpleHaze" | "active" | "gradient";
} & FlexProps;

const Card = (props: CardProps) => {
  const { variant, ...rest } = props;
  switch (variant) {
    case "whiteShadow":
      return <WhiteShadow {...rest} />;
    case "purpleHaze":
      return <PurpleHaze {...rest} />;
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
          p={10}
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
      p={10}
      flexDir={"column"}
      {...rest}
    />
  );
};

const PurpleHaze = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      bg={"hollywood.50"}
      opacity={0.5}
      borderWidth={1}
      borderColor={"black"}
      p={10}
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
      p={10}
      flexDir={"column"}
      {...rest}
    />
  );
};

const Gradient = ({ ...rest }: FlexProps) => {
  return (
    <Flex
      bg="var(--gradient)"
      borderWidth={1}
      borderColor={"black"}
      p={10}
      flexDir={"column"}
      {...rest}
    />
  );
};

export default Card;
