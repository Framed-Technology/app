import { colors } from "@/theme";
import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

const Card = (props: FlexProps) => {
  return (
    <Flex
      bg={colors["pink-salmon"][500]}
      borderWidth={2}
      borderColor={"black"}
      shadow={"5px 5px 0 black"}
      p={4}
      flexDir={"column"}
      {...props}
    />
  );
};

export default Card;
