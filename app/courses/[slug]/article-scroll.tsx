"use client";

import { Article as ArticleProps } from "@/api/types";
import Card from "@/components/ui/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Text, Tag, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

var settings = {
  dots: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  swipeToSlide: true,
  centerPadding: "10px",
  draggable: true,
  focusOnSelect: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
  centerMode: true,
  infinite: false,
};

const ArticleScroll = ({ articles }: { articles: ArticleProps[] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigator = useRouter();

  const onBeforeChange = (oldIdx: number, newIdx: number) => {
    setActiveSlide(newIdx);
  };

  return (
    <Box w={"100vw"} position={"relative"}>
      <Slider {...settings} beforeChange={onBeforeChange}>
        {articles.map((a, key) => {
          return (
            <Box
              key={key}
              p={4}
              opacity={key !== activeSlide ? 0.5 : 1}
              _hover={{ opacity: 1 }}
            >
              <Card
                onClick={() => {
                  if (key === activeSlide) {
                    navigator.push(`/courses/article/${a.slug}`);
                  }
                }}
                justifyContent={"space-between"}
                alignItems={"center"}
                cursor={"pointer"}
                key={key}
                w={"full"}
                h={"full"}
                maxH={250}
                gap={6}
              >
                <Tag
                  w={"fit-content"}
                  size={"sm"}
                  colorScheme="hollywood"
                  letterSpacing={1}
                >
                  Article {key + 1}
                </Tag>
                <Flex flexDir={"column"} textAlign={"center"}>
                  <Text fontSize={"xl"} fontWeight={600}>
                    {a.title}
                  </Text>
                  <Text>{a.subTitle}</Text>
                  <Text textColor={"white"} size={"sm"}>
                    {a.minsToRead} mins
                  </Text>
                </Flex>
                <Box />
              </Card>
            </Box>
          );
        })}
        <Box />
        <Box />
      </Slider>
    </Box>
  );
};

export default ArticleScroll;
