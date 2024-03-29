"use client";

import { Path as PathProps } from "@/api/types";
import Card from "@/components/ui/card";
import { colors } from "@/theme";
import { Flex, Tag, Heading, Text } from "@chakra-ui/react";
import Link from "next/link";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { useSession } from "next-auth/react";

const Path = ({
  isFree,
  slug,
  level,
  title,
  description,
  image,
  articles,
}: PathProps) => {
  const { data: session } = useSession();
  const isLoggedIn = Boolean(session);
  const isUnlocked = isFree || isLoggedIn

  const numArticles = articles?.data?.length ?? 0;

  return (
    <Link href={isUnlocked ? `/courses/${slug}` : `/signup`}>
      <Card
        variant={isUnlocked ? "whiteShadow" : "purpleHaze"}
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
            <Flex
              justifyContent={"space-between"}
              alignItems={"center"}
              flexWrap="wrap"
              gap={2}
            >
              <Tag
                w={"fit-content"}
                size={"sm"}
                bg="glowstone.500"
                letterSpacing={1}
                mr={2}
                maxWidth={{ base: "100%", md: "fit-content" }}
                whiteSpace="nowrap"
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
                  maxWidth={{ base: "100%", md: "fit-content" }}
                  whiteSpace="nowrap"
                >
                  Member-only
                  <FaStar size={16} style={{ color: colors.glowstone[500] }} />
                </Tag>
              )}
            </Flex>
            <Heading size={"md"}>{title}</Heading>
            <Text fontSize={"md"}>{description}</Text>
            <Text textColor={"black"} fontSize={"xs"}>
              {numArticles} ARTICLE{numArticles > 1 && "S"}
            </Text>
          </Flex>
          <Flex minW={"25%"} justifyContent={"center"}>
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

export default Path;
