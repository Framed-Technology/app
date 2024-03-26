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
} from "@chakra-ui/react";
import { Path as PathProps } from "@/api/types";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";
import platypusLogo from "../../public/platypus.svg";
import { FaStar } from "react-icons/fa";

// TODO: update "article" to "learning path"

const Paths = async () => {
  const paths = await readPaths();
  // return <pre>{JSON.stringify(paths, null, 2)}</pre>;

  // Sort paths by isFree first and then by level
  paths.data.sort((a, b) => {
    if (a.attributes.isFree !== b.attributes.isFree) {
      // Sort by isFree
      return a.attributes.isFree ? -1 : 1; // Put free paths first
    } else {
      // Sort by level if isFree is the same
      return a.attributes.level.localeCompare(b.attributes.level);
    }
  });

  return (
    <Flex flexDir={"column"} gap={4}>
    <Banner/>
      <Heading fontSize={"lg"}>Learning paths</Heading>
      <SimpleGrid columns={{ sm: 1, lg: 2 }} gap={4}>
        {paths.data.map((path, key) => (
          <Path
            key={key}
            isFree={path.attributes.isFree}
            slug={path.attributes.title.replaceAll(" ", "-").toLowerCase()}
            level={path.attributes.level}
            title={path.attributes.title}
            description={path.attributes.description}
            image={platypusLogo}
            publishedAt={new Date().toDateString()}
            articles={path.attributes.articles}
          />
        ))}
      </SimpleGrid>
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
        variant={isFree ? "whiteShadow" : "locked"}
        position={"relative"}
        flexDir={"row"}
        justifyContent={"space-between"}
      >
        <Flex flexDir={"column"} gap={1}>
          <Flex justifyContent={"space-between"} alignItems={"center"}>
            <Tag
              w={"fit-content"}
              size={"sm"}
              bg="#FDB548"
              letterSpacing={1}
              mr={2}
            >
              {level}
            </Tag>
            {!isFree && (
              <Tag
                w={"fit-content"}
                size={"sm"}
                colorScheme="hollywood"
                letterSpacing={1}
                gap={2}
                bg="#EA0091"
                opacity={1}
                zIndex={100}
              >
                Member-only
                <FaStar size={16} style={{ color: "#FDB548" }} />
              </Tag>
            )}
          </Flex>
          <Text fontWeight={600} fontSize={"xl"}>
            {title}
          </Text>
          <Text>{description}</Text>
          <Text textColor={"white"} fontSize={"xs"}>
            {numArticles} ARTICLE{numArticles > 1 && "S"}
          </Text>
        </Flex>
        <Flex minW={"30%"} justifyContent={"center"}>
          <Image src={image} height={100} width={100} alt="Magenta Platypus" />{" "}
        </Flex>
      </Card>
    </Link>
  );
};

const Banner = () => {
  return (
    <Flex
      bg="blue.500"
      color="white"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Heading fontSize="lg" mr={4}>
        Get unlimited access for free
      </Heading>
      <Link href={"/signup"}>
        <Button colorScheme="white" variant="outline">
          Sign Up
        </Button>
      </Link>
    </Flex>
  );
};

export default Paths;
