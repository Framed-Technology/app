"use client";

import {
  Text,
  Button,
  Flex,
  Input,
  NumberInput,
  NumberInputField,
  InputGroup,
  InputLeftElement,
  Box,
} from "@chakra-ui/react";
import React, { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaCog, FaPlus } from "react-icons/fa";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { colors } from "@/theme";
import Card from "../ui/card";
import { calculateRvol, savePortfolioRiskReturn } from "./actions";
import { useRouter } from "next/navigation";
import PortfolioPie from "../ui/portfolio-pie";

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

  return (
    <Flex flexDir={"column"} gap={4}>
      <Card>
        <Flex
          justifyContent={"center"}
          alignItems={"center"}
          flexDir={"column"}
        >
          <Text
            color={"black"}
            fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
            fontWeight={500}
          >
            Portfolio Breakdown
          </Text>
          <Text color={"white"} fontSize={"xl"} fontWeight={400}>
            See the composition of your portfolio
          </Text>

          <PortfolioPie allocations={allocations} />
        </Flex>
      </Card>
      <Card>
        <Flex gap={4} p={4} flexDir={"column"} w="full">
          {entries.map((entry, key) => {
            return (
              <Flex
                gap={4}
                key={key}
                w="full"
                justifyContent={"space-between"}
                flexDir={{ base: "column", sm: "row" }}
                p={{ base: 4, sm: 0 }}
                bg={{ base: "pink-salmon.400", sm: "transparent" }}
              >
                <Input
                  w="full"
                  placeholder="Investment"
                  value={entry.ticker}
                  onChange={(e) =>
                    handleChange(entry.id, e.target.value, entry.holding)
                  }
                />
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

                <Flex
                  cursor={"not-allowed"}
                  bg={"white"}
                  borderWidth={2}
                  borderColor={"black"}
                  shadow={"5px 5px 0 black"}
                  w={{ base: "full", sm: 200 }}
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
          <Flex w="full" gap={2} justifyContent={"space-between"}>
            <Button
              rightIcon={<FaCog />}
              colorScheme="hollywood"
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Calculate Risk
            </Button>
            <Button
              colorScheme="picton-blue"
              onClick={handleAddEntry}
              rightIcon={<FaPlus />}
              minW={100}
            >
              Add
            </Button>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
};

export default RvolCalculator;
