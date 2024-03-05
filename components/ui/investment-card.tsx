import { Investment, investments } from "@/static/investments";
import { Flex, Text } from "@chakra-ui/react";
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
      gap={{ base: 12, md: 8 }}
      alignItems={"center"}
      justifyContent={{ base: "center", md: "space-between" }}
      flexDir={{ base: "column", md: "row" }}
    >
      <Flex
        w={{ base: "100%", md: "30%" }}
        textAlign={{ base: "center", md: "left" }}
        flexDir={"column"}
      >
        <Text
          textColor={"white"}
          opacity={0.5}
          fontSize={{ base: "xs", md: "sm", lg: "md" }}
        >
          {investment.id}
        </Text>
        <Text
          color={"black"}
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight={500}
        >
          {investment.name}
        </Text>
        <Text color={"white"} fontSize={"xl"} fontWeight={400}>
          {investment.description}
        </Text>
        <a
          className="hover:underline text-white/50"
          href={investment.link}
          target="_blank"
        >
          <Text fontSize={{ base: "xs", md: "sm", lg: "md" }}>
            Not sure what this is?
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
