import React, { useEffect } from "react";
import { readPaths } from "./actions";
import {
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Button,
  Box,
  Avatar,
  Tag,
  color,
  Center,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";
import platypusWalking from "../../public/platypus-walking.svg";
import { FaStar } from "react-icons/fa";
import { colors } from "@/theme";
import Path from "./path";
import { redirect } from "next/navigation";

// TODO: update "article" to "learning path"

const Paths = async () => {
  const paths = await readPaths();
  // return <pre>{JSON.stringify(paths, null, 2)}</pre>;

redirect('/');

  return (
    <Flex flexDir={"column"} gap={12}>
      <Banner />
      <Stack flexDir={"column"}>
        <Heading size={"2xl"} marginBottom={4}>
          Learning paths
        </Heading>
        <Heading size="md" fontWeight={"normal"}>
          Some copy to describe what this page is all about
        </Heading>
      </Stack>
      <Stack gap={6}>
        <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ base: 4, sm: 4, lg: 6 }}>
          {paths.data.map((path, key) => (
            <Path
              key={key}
              isFree={path.attributes.isFree}
              slug={path.attributes.title.replaceAll(" ", "-").toLowerCase()}
              level={path.attributes.level}
              title={path.attributes.title}
              description={path.attributes.description}
              image={platypusWalking}
              publishedAt={new Date().toDateString()}
              articles={path.attributes.articles}
            />
          ))}
        </SimpleGrid>
        <Center>
          <Link href={"/signup"}>
            <Button colorScheme="hollywood" shadow="5px 5px 0 black">
              Sign-up for free
            </Button>
          </Link>
        </Center>
      </Stack>
      <Flex flexDir={"column"}>
        <Heading marginBottom={4} marginTop={4}>
          Disclaimer
        </Heading>
        <Text fontSize="md">
          This may or may not be a disclaimer which clearly states that this is
          not financial advice
        </Text>
      </Flex>
    </Flex>
  );
};

const Banner = () => {
  return (
    <Flex
      bg="hollywood.50"
      alignItems="center"
      justifyContent="center"
      p={0.5}
      borderTop="1px solid black"
      borderBottom="1px solid black"
    >
      <Text display="flex" alignItems="center" mr={2}>
        <FaStar
          size={16}
          style={{ color: colors.glowstone[500], marginRight: "0.5rem" }}
        />
        <Text>Get unlimited access for free</Text>
      </Text>
      <Link href={"/signup"}>
        <Button variant="link" borderWidth={0} color="hollywood.500">
          Sign Up
        </Button>
      </Link>
    </Flex>
  );
};

export default Paths;
