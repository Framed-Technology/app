import React, { useEffect } from "react";
import { readPaths } from "./actions";
import {
  Flex,
  Text,
  Heading,
  SimpleGrid,
  Box,
  Avatar,
  Tag,
} from "@chakra-ui/react";
import { Path as PathProps } from "@/api/types";
import Image from "next/image";
import Link from "next/link";
import Card from "@/components/ui/card";

import platypusLogo from "../../public/platypus.svg";
import { FaLock } from "react-icons/fa";

// TODO: update "article" to "learning path"

const Paths = async () => {
  const paths = await readPaths();
  // return <pre>{JSON.stringify(paths, null, 2)}</pre>;
  return (
    <Flex flexDir={"column"} gap={4}>
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
        position={"relative"}
        flexDir={"row"}
        justifyContent={"space-between"}
      >
        {!isFree && (
          <Flex
            zIndex={50}
            className="bg-gray-100/60"
            position={"absolute"}
            top={0}
            bottom={0}
            left={0}
            right={0}
            justifyContent={"center"}
            alignItems={"center"}
          >
            <FaLock size={60} className="text-gray-800/50" />
          </Flex>
        )}
        <Flex flexDir={"column"} gap={1}>
          <Tag
            w={"fit-content"}
            size={"sm"}
            colorScheme="hollywood"
            letterSpacing={1}
          >
            {level}
          </Tag>
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

export default Paths;
