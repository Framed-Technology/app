import { Investment, investments } from "@/static/investments";
import { Flex, Text } from "@chakra-ui/react";
import { FaExternalLinkAlt } from "react-icons/fa";

import Card from "./card";

const InvestmentCard = ({
  children,
  investment,
}: {
  children: React.ReactNode;
  investment: Investment;
}) => (
  <Card>
    <Flex
      p={6}
      w={"full"}
      gap={{ base: 12, md: 8}}
      alignItems={"center"}
      justifyContent={{ base: "center", md: "space-between" }}
      flexDir={{ base: "column", md: "row" }}
    >
      <Flex
        w={{ base: "100%", md: "30%" }}
        textAlign={{ base: "center", md: "left" }}
        gap={{ base: 0.2, md: 0.5, lg: 1}}
        flexDir={"column"}
      >
        <Text
          textColor={"black"}
          opacity={0.4}
          fontSize={{ base: "xs", md: "xs", lg: "xs" }}
        >
          {investment.id}
        </Text>
        <Text
          textColor={"black"}
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight={500}
        >
          {investment.name}
        </Text>
        <Text
          color={"black"}
          opacity={0.8}
          fontSize={{ base: "xs", md: "sm", lg: "sm" }}
          fontWeight={400}
        >
          {investment.description}
        </Text>
        <a
          className="hover:underline text-black/50"
          href={investment.link}
          target="_blank"
        >
          <Text
            fontSize={{ base: "xs", md: "xs", lg: "xs" }}
            textColor={"black"}
            opacity={0.4}
          >
            Not sure what this is?
            <FaExternalLinkAlt
              style={{
                marginLeft: "5px",
                display: "inline",
                color: "black",
                opacity: 0.4,
              }}
            />
          </Text>
        </a>
      </Flex>
      <Flex
        w={{ base: "100%", md: "70%" }}
        px={{ base: 2, md: 0 }}
        justifyContent={"center"}
      >
        {children}
      </Flex>
    </Flex>
  </Card>
);

export default InvestmentCard;
