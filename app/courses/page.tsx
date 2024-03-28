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
import { Path as PathProps } from "@/api/types";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";
import platypusWalking from "../../public/platypus-walking.svg";
import { FaStar } from "react-icons/fa";
import { colors } from "@/theme";

// TODO: update "article" to "learning path"

const Paths = async () => {
  const paths = await readPaths();
  // return <pre>{JSON.stringify(paths, null, 2)}</pre>;

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
        <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={{ sm: 4, lg: 6 }}>
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

const Path = ({
  isFree,
  slug,
  level,
  title,
  description,
  image,
  articles,
}: PathProps) => {
  const numArticles = articles?.data?.length ?? 0;
  return (
    <Link href={isFree ? `/courses/${slug}` : `/signup`}>
      <Card
        variant={isFree ? "whiteShadow" : "purpleHaze"}
        position={"relative"}
        flexDir={"row"}
        justifyContent={"space-between"}
        style={{ display: "flex", flexDirection: "column", minHeight: 0 }}
      >
        <Flex
          flexDir="row"
          justifyContent="space-between"
          style={{ flex: 1 }}
          gap={4}
        >
          <Flex flexDir={"column"} gap={2}>
            <Flex justifyContent={"space-between"} alignItems={"center"}>
              <Tag
                w={"fit-content"}
                size={"sm"}
                bg="glowstone.500"
                letterSpacing={1}
                mr={2}
              >
                {level}
              </Tag>
              {!isFree && (
                <Tag
                  w={"fit-content"}
                  size={"sm"}
                  letterSpacing={1}
                  gap={2}
                  bg="hollywood.500"
                  opacity={1}
                  zIndex={100}
                >
                  Member-only
                  <FaStar size={16} style={{ color: colors.glowstone[500] }} />
                </Tag>
              )}
            </Flex>
            <Heading size={"md"}>
              {title}
            </Heading>
            <Text fontSize={"md"}>{description}</Text>
            <Text textColor={"black"} fontSize={"xs"}>
              {numArticles} ARTICLE{numArticles > 1 && "S"}
            </Text>
          </Flex>
          <Flex minW={"30%"} justifyContent={"center"}>
            <Image
              src={image}
              height={150}
              width={150}
              alt="Magenta Platypus Walking"
            />{" "}
          </Flex>
        </Flex>
      </Card>
    </Link>
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
