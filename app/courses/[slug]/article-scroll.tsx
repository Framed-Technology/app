"use client";

import { Article as ArticleProps } from "@/api/types";
import Card from "@/components/ui/card";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, Text, Tag, Flex, Heading, Divider } from "@chakra-ui/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useBreakpointValue } from "@chakra-ui/react";

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
        slidesToShow: 1,
        centerMode: true,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        centerMode: true,
      },
    },
  ],
  centerMode: true,
  infinite: false,
};

const ArticleScroll = ({ articles }: { articles: ArticleProps[] }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const navigator = useRouter();
  const isNotSmallScreen = useBreakpointValue({ base: false, md: true });

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
                variant={key === activeSlide ? "active" : "whiteShadow"}
                justifyContent={"space-between"}
                alignItems={"center"}
                cursor={"pointer"}
                w={"full"}
                h={"full"}
                maxH={250}
                boxShadow={key === activeSlide ? "5px 5px 0 black" : "none"}
              >
                {/* <Tag
                  w={"fit-content"}
                  size={"sm"}
                  colorScheme="hollywood"
                  letterSpacing={1}
                >
                  Article {key + 1}
                </Tag> */}
                <Flex flexDir={"column"} textAlign={"center"} gap={4}>
                  <Heading textColor={"black"} size={"md"}>
                    {a.title}
                  </Heading>
                  <Text color={"black"} opacity={0.8} fontSize={"md"}>
                    {a.subTitle}
                  </Text>
                  <Text textColor={"black"} opacity={0.4} fontSize={"sm"}>
                    {a.minsToRead} Mins
                  </Text>
                </Flex>
                <Box />
              </Card>
            </Box>
          );
        })}
        {isNotSmallScreen && <Box />}
        {isNotSmallScreen && <Box />}
      </Slider>
    </Box>
  );
};

export default ArticleScroll;
