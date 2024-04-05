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
  Heading,
  Text,
} from "@chakra-ui/react";
import { Formik } from "formik";
import { insertPerceivedInvestmentRisk } from "../../app/actions";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/navigation";
import { Investment, investments } from "@/static/investments";
import InvestmentCard from "../ui/investment-card";
import CardContainer from "../ui/card-container";

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
          <CardContainer>
            <Box
              paddingRight={{ base: 4, lg: 20 }}
              paddingLeft={{ base: 4, lg: 20 }}
              marginBottom={2}
            >
              <Heading
                fontWeight={500}
                size={"lg"}
                textAlign={"center"}
                marginBottom={4}
              >
                Compare how you percieve risk against{" "}
                <b className="text-hollywood-400">{submissionCount}</b> others
              </Heading>
              <Text fontSize={"lg"} textAlign={"center"} opacity={0.8}>
                Rate each of the following investments riskiness on a scale from
                Cash to NFTs to see how your percieved risk compared to everyone
                elses
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
              marginTop={2}
            >
              Submit
            </Button>
          </CardContainer>
        </form>
      )}
    </Formik>
  );
};

const InvestmentRiskSlider = (props: InvestmentRiskSliderProps) => {
  return (
    <Slider
      id={props.investment.id}
      min={1}
      max={12}
      {...props.inputProps}
      overflow= 'visible'
    >
      <SliderTrack rounded={"full"} h={4} bg="hollywood.50">
        <SliderFilledTrack bg="hollywood.500" />
      </SliderTrack>
      <SliderThumb h={5} w={5} />
      <SliderMark mt={3} ml={0} value={0}>
        <Text textColor={"black"} opacity={0.8} fontSize={"sm"}>
          {"Cash: 0"}
        </Text>
      </SliderMark>
      <SliderMark mt={3} ml={-10} minWidth={100} value={12}>
        <Text textColor={"black"} opacity={0.8} fontSize={"sm"}>
        {"Bitcoin: 12"}
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
