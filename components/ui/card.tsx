import { colors } from "@/theme";
import { Box } from "@chakra-ui/react";
import React from "react";

const Card = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      bg={colors["pink-salmon"][500]}
      borderWidth={2}
      borderColor={"black"}
      shadow={"5px 5px 0 black"}
      p={4}
    >
      {children}
    </Box>
  );
};

export default Card;
