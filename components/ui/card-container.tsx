import { colors } from "@/theme";
import { Flex, FlexProps } from "@chakra-ui/react";
import React from "react";

const CardContainer = (props: FlexProps) => {
  return (
    <Flex
      flexDir={"column"}
      gap={6}
      w={"full"}
      bg={"white"}
      shadow={"5px 5px 0 black"}
      borderColor={"black"}
      borderWidth={2}
      p={{base: 6, md: 12}}
      {...props}
    />
  );
};

export default CardContainer;
