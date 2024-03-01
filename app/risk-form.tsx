"use client";

import React, { ComponentProps, Suspense, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Skeleton,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import {
  Legend,
  ResponsiveContainer,
  Area,
  XAxis,
  AreaChart,
  ReferenceLine,
  Label,
  Tooltip,
} from "recharts";
import { colors } from "@/theme";
import {
  InvestmentRisk,
  insertPerceivedInvestmentRisk,
  readPerceivedInvestmentRisk,
} from "./actions";
import { v4 as uuidv4 } from "uuid";

type Investment = { id: string; name: string; description: string };

type InvestmentRiskSliderProps = {
  investment: Investment;
  inputProps: ComponentProps<typeof Slider>;
};

const investments = [
  {
    id: "sandp500",
    name: "S&P500",
    description: "An index that tracks the 500 largest companies in the US",
  },
  {
    id: "corportatebonds",
    name: "Corporate Bonds",
    description: "Debt issued by companies",
  },
  {
    id: "tesla",
    name: "Tesla Inc.",
    description: "Equity in Tesla Motors",
  },
  {
    id: "microsoft",
    name: "Microsoft",
    description: "Equity in Microsoft",
  },
  {
    id: "govermentbonds",
    name: "Government Bonds",
    description: "Debt issues by the US Goverment",
  },
];

const initialValues = investments.reduce<{ [key: string]: number }>((p, c) => {
  p[c.id] = 1;
  return p;
}, {});

const RiskForm = ({}) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        const sessionId = uuidv4();
        const data = Object.keys(values).map((investmentId) => {
          return { investmentId, userRisk: values[investmentId], sessionId };
        });
        // TODO: Handle this for possible errors.
        await insertPerceivedInvestmentRisk(data);
        setSubmitting(false);
        setIsSubmitted(true);
      }}
    >
      {(formik) => (
        <form className="w-full h-full" onSubmit={formik.handleSubmit}>
          <Flex
            flexDir={"column"}
            gap={4}
            w={"full"}
            bg={"lily-white.100"}
            shadow={"5px 5px 0 black"}
            borderColor={"black"}
            borderWidth={2}
            p={4}
          >
            <Text fontWeight={500} fontSize={"xl"} textAlign={"center"}>
              Find out how your precieved risk compares to everyone else!
            </Text>

            {investments.map((investment, key) => (
              <InvestmentCard key={key} investment={investment}>
                {isSubmitted ? (
                  <InvestmentRiskResults
                    investmentId={investment.id}
                    userRisk={formik.values[investment.id]}
                  />
                ) : (
                  <InvestmentRiskSlider
                    investment={investment}
                    inputProps={{
                      value: formik.values[investment.id],
                      onChange: (value: number) =>
                        formik.setFieldValue(investment.id, value),
                    }}
                  />
                )}
              </InvestmentCard>
            ))}
            <Button
              isLoading={formik.isSubmitting}
              isDisabled={isSubmitted}
              type="submit"
              colorScheme="hollywood"
            >
              Submit
            </Button>
          </Flex>
        </form>
      )}
    </Formik>
  );
};

const InvestmentCard = ({
  children,
  investment,
}: {
  children: React.ReactNode;
  investment: Investment;
}) => (
  <Flex
    minH={250}
    py={8}
    px={4}
    w={"full"}
    gap={{ base: 12, md: 8 }}
    bg={"pink-salmon.500"}
    shadow={"5px 5px 0 black"}
    borderColor={"black"}
    borderWidth={2}
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
        color={"black"}
        fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
        fontWeight={500}
      >
        {investment.name}
      </Text>
      <Text color={"white"} fontSize={"xl"} fontWeight={400}>
        {investment.description}
      </Text>
    </Flex>
    <Flex
      w={{ base: "100%", md: "70%" }}
      px={{ base: 2, md: 0 }}
      justifyContent={"center"}
    >
      {children}
    </Flex>
  </Flex>
);

const InvestmentRiskSlider = (props: InvestmentRiskSliderProps) => {
  return (
    <Slider
      id={props.investment.id}
      defaultValue={0}
      min={1}
      max={12}
      {...props.inputProps}
    >
      <SliderTrack rounded={"full"} h={4} bg="pink-salmon.400">
        <SliderFilledTrack bg="hollywood.500" />
      </SliderTrack>
      <SliderThumb h={5} w={5} />
      <SliderMark mt={3} ml={-1} value={1}>
        <Text fontWeight={500} textColor={"white"}>
          Cash
        </Text>
      </SliderMark>
      <SliderMark mt={3} ml={-8} value={12}>
        <Text fontWeight={500} textColor={"white"}>
          NFTs
        </Text>
      </SliderMark>
      <SliderMark mt={-10} ml={-4} value={props.inputProps.value!}>
        <Box
          bg={"hollywood.400"}
          color={"white"}
          px={2}
          fontWeight={500}
          rounded={"md"}
        >{`${props.inputProps.value!}`}</Box>
      </SliderMark>
    </Slider>
  );
};

const InvestmentRiskResults = ({
  userRisk,
  investmentId,
}: {
  userRisk: number;
  investmentId: string;
}) => {
  const [data, setData] = useState<
    {
      investmentId: string | null;
      riskLevel: number;
      count: number;
    }[]
  >([]);
  const [renderChart, setRenderChart] = useState(false);
  useEffect(() => {
    const readData = async () => {
      const res = await readPerceivedInvestmentRisk(investmentId);
      const resWithZeros = Array.from(Array(12).keys()).map((idx) => {
        const riskLevel = idx + 1;
        return {
          investmentId,
          riskLevel,
          count: res.find((e) => e.riskLevel === riskLevel)?.count ?? 0,
        };
      });
      setData(resWithZeros);
      setRenderChart(true);
    };
    readData();
  }, []);

  if (!renderChart) {
    return <Skeleton w="full" height={"120px"} opacity={0.3} rounded={0} />;
  }

  return (
    <Flex w={"full"} h={120} gap={0} flexDir={"column"}>
      <ResponsiveContainer width="100%" height={"100%"}>
        <AreaChart
          data={data}
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <Area
            name="Community"
            type="monotone"
            dataKey="count"
            stroke={colors.hollywood[400]}
            fill={colors.hollywood[400]}
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <XAxis
            name={"Risk"}
            dataKey={"riskLevel"}
            domain={[1, 12]}
            tick={false}
          />
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="top" align="right" />
          <ReferenceLine
            x={userRisk}
            strokeWidth={2}
            stroke={colors.hollywood[600]}
          >
            <Label color="#fff" position={"bottom"}>
              You
            </Label>
          </ReferenceLine>
        </AreaChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default RiskForm;
