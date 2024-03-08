"use client";

import React, { ComponentProps, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { insertPerceivedInvestmentRisk } from "../../app/actions";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Investment, investments } from "@/static/investments";
import InvestmentCard from "../ui/investment-card";

type InvestmentRiskSliderProps = {
  investment: Investment;
  inputProps: ComponentProps<typeof Slider>;
};

const initialValues = investments.reduce<{ [key: string]: number }>((p, c) => {
  p[c.id] = 1;
  return p;
}, {});

const RiskSurvey = ({ submissionCount }: { submissionCount: number }) => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const router = useRouter();

  const handleSubmit = async (
    values: { [key: string]: number },
    { setSubmitting }: { setSubmitting: (b: boolean) => void }
  ) => {
    const resultId = uuidv4();
    const data = Object.keys(values).map((investmentId) => {
      return {
        investmentId,
        userRisk: values[investmentId],
        sessionId: resultId,
      };
    });
    try {
      await insertPerceivedInvestmentRisk(data);
      setIsSubmitted(true);
    } catch (err) {
      console.error("Error occured while submitting form:", err);
    } finally {
      setSubmitting(false);
      router.push(`/tools/risk-survey/${resultId}`);
    }
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
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
            p={6}
          >
            <Box>
              <Text fontWeight={500} fontSize={"2xl"} textAlign={"center"}>
                Compare how you percieve risk against{" "}
                <b className="text-hollywood-400">{submissionCount}</b> others!
              </Text>
              <Text fontSize={"md"} textAlign={"center"} opacity={0.8}>
                Rate each of the following investments riskiness on a scale from
                Cash to NFTs to see how your percieved risk compared to everyone
                elses!
              </Text>
            </Box>

            {investments.map((investment, key) => (
              <InvestmentCard key={key} investment={investment}>
                <InvestmentRiskSlider
                  investment={investment}
                  inputProps={{
                    value: formik.values[investment.id],
                    onChange: (value: number) =>
                      formik.setFieldValue(investment.id, value),
                  }}
                />
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

export default RiskSurvey;
