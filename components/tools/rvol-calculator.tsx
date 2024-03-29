"use client";

import {
  Text,
  Button,
  Flex,
  Input,
  Box,
  Heading,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputLeftElement,
  Tooltip,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaCog, FaPlus } from "react-icons/fa";
import Card from "../ui/card";
import { calculateRvol, savePortfolioRiskReturn } from "./actions";
import { useRouter } from "next/navigation";
import PortfolioPie from "../ui/portfolio-pie";
import TickerSelect from "./ticker-select";
import CardContainer from "../ui/card-container";

Input.defaultProps = {
  shadow: "5px 5px 0 black",
  rounded: 0,
  borderWidth: 2,
  borderColor: "black",
  bg: "white",
};

NumberInputField.defaultProps = {
  shadow: "5px 5px 0 black",
  rounded: 0,
  borderWidth: 2,
  borderColor: "black",
  bg: "white",
};

const RvolCalculator = () => {
  const [entries, setEntries] = useState([
    { ticker: "", holding: 0, id: uuidv4() },
  ]);

  const [isLoading, setLoading] = useState(false);

  const router = useRouter();

  const totalHolding = useMemo(
    () =>
      entries
        .map((entry) => {
          try {
            return Number(entry.holding);
          } catch (err) {
            return 0;
          }
        })
        .reduce((p, c) => {
          p += c;
          return p;
        }, 0),
    [entries]
  );

  const allocations = useMemo(() => {
    return entries
      .filter((entry) => entry.holding > 0)
      .map((entry) => {
        return {
          ticker: entry.ticker,
          allocation: entry.holding / totalHolding,
        };
      });
  }, [totalHolding]);

  const handleChange = (id: string, ticker: string, holding: number) => {
    setEntries(
      entries.map((entry) => {
        if (entry.id !== id) {
          return entry;
        }
        return { id: entry.id, ticker, holding };
      })
    );
  };
  const handleAddEntry = () => {
    setEntries([...entries, { id: uuidv4(), ticker: "", holding: 0 }]);
  };
  const handleRemoveEntry = (id: string) => {
    if (entries.length === 1) return;
    setEntries(entries.filter((entry) => entry.id !== id));
  };

  const handleSubmit = async () => {
    try {
      const resultId = uuidv4();
      setLoading(true);

      const riskReturn = await calculateRvol(allocations);
      await savePortfolioRiskReturn(
        resultId,
        allocations,
        riskReturn.rvol,
        riskReturn.ret
      );
      router.push(`/tools/rvol-calculator/${resultId}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const formComplete = useMemo(
    () => !entries.some((entry) => entry.holding === 0 || entry.ticker === ""),
    [entries]
  );

  return (
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
          Compare how your portfolio ‘risk’ vs return compares
        </Heading>
        <Text fontSize={"lg"} textAlign={"center"} opacity={0.8}>
          Include the holdings of each of your investments and we will show you
          on a riskness and return scale where you sit compared to others as
          well as common instruments like the S&P500
        </Text>
      </Box>
      <Card>
        <Flex
          flexDir={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          w={"full"}
          textAlign={"center"}
        >
          <Heading size={"md"} textAlign={"center"}>
            Your Portfolio Breakdown
          </Heading>
          <PortfolioPie allocations={allocations} />
        </Flex>
      </Card>
      <Card>
        <Box position="relative">
          <Flex gap={4} p={4} flexDir={"column"} w="full">
            {entries.map((entry, key) => {
              return (
                <Flex
                  gap={4}
                  key={key}
                  w="full"
                  justifyContent={"space-between"}
                  flexDir={{ base: "column", md: "row" }}
                  p={{ base: 4, sm: 0 }}
                  bg={{ base: "pink-salmon.400", sm: "transparent" }}
                >
                  <TickerSelect
                    placeholder="Investment"
                    className="w-full"
                    value={entry.ticker}
                    onChangeCustom={(ticker) => {
                      handleChange(entry.id, ticker, entry.holding);
                    }}
                  />
                  <Tooltip
                    hasArrow
                    placement="top"
                    bg="hollywood.100"
                    label={
                      key === 0
                        ? "We don't store this, just used to calculate the %"
                        : ""
                    }
                    aria-label="A tooltip"
                    sx={{
                      textAlign: "center",
                      fontStyle: "italic",
                      maxW: "300px",
                    }}
                  >
                    <InputGroup>
                      <NumberInput
                        defaultValue={0}
                        min={0}
                        textAlign={"right"}
                        w={"full"}
                        value={Number(entry.holding).toLocaleString()}
                        onChange={(holding) =>
                          handleChange(entry.id, entry.ticker, Number(holding))
                        }
                      >
                        <NumberInputField textAlign={"right"} />
                        <InputLeftElement
                          pointerEvents="none"
                          color="gray.300"
                          fontSize="1.2em"
                        >
                          $
                        </InputLeftElement>
                      </NumberInput>
                    </InputGroup>
                  </Tooltip>

                  <Flex
                    cursor={"not-allowed"}
                    bg={"white"}
                    borderWidth={2}
                    borderColor={"black"}
                    shadow={"5px 5px 0 black"}
                    w={{ base: "full", md: 300 }}
                    h="40px"
                    gap={1}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    {totalHolding
                      ? Math.round(100 * (Number(entry.holding) / totalHolding))
                      : 0}
                    <Text>%</Text>
                  </Flex>

                  <Button
                    colorScheme="red"
                    isDisabled={entries.length === 1}
                    onClick={() => handleRemoveEntry(entry.id)}
                    minWidth={100}
                  >
                    Remove
                  </Button>
                </Flex>
              );
            })}
            <Flex
              w="full"
              gap={2}
              justifyContent={"end"}
              flexDir={{ base: "column", md: "row" }}
            >
              <Button
                isDisabled={!formComplete}
                colorScheme="picton-blue"
                onClick={handleAddEntry}
                rightIcon={<FaPlus />}
                minWidth={100}
              >
                Add
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Card>
      <Button
        isDisabled={!formComplete || entries.length === 1}
        marginTop={2}
        colorScheme="hollywood"
        onClick={handleSubmit}
        isLoading={isLoading}
      >
        Submit
      </Button>
    </CardContainer>
  );
};

export default RvolCalculator;
