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
import { calculateRvol } from "./actions";

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

const PortfolioForm = () => {
  const [entries, setEntries] = useState([
    { ticker: "", holding: 0, id: uuidv4() },
  ]);

  const [isLoading, setLoading] = useState(false);

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
      setLoading(true);
      const allocations = entries
        .filter((entry) => entry.holding > 0)
        .map((entry) => {
          return {
            ticker: entry.ticker,
            allocation: entry.holding / totalHolding,
          };
        });
      const riskReturn = await calculateRvol(allocations);
      alert(JSON.stringify(riskReturn));
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

          <PortfolioPieChart portfolioEntries={entries} />
        </Flex>
      </Card>
      <Card>
        <Flex gap={4} p={4} flexDir={"column"} w="full">
          {entries.map((entry, key) => {
            return (
              <Flex gap={4} key={key} w="full" justifyContent={"space-between"}>
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
                  w={200}
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

const PortfolioPieChart = ({
  portfolioEntries,
}: {
  portfolioEntries: {
    ticker: string;
    holding: number;
    id: string;
  }[];
}) => {
  const colorArray = Object.values(colors.constrast);

  if (portfolioEntries.filter((e) => e.holding > 0).length === 0) {
    return (
      <Flex
        h={300}
        w="full"
        p={4}
        justifyContent={"center"}
        alignItems={"center"}
        flexDir={"column"}
      >
        <Text fontSize={"md"}>No Investments</Text>
        <Text fontSize={"sm"} opacity={0.8}>
          Add investments below to see investment breakdown
        </Text>
      </Flex>
    );
  }

  return (
    <Box h={300} w="full" p={4}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={200} height={200}>
          <Pie
            dataKey="holding"
            data={portfolioEntries.map((entry) => {
              return { ...entry, name: entry.ticker };
            })}
            paddingAngle={4}
            outerRadius={80}
            innerRadius={55}
          >
            {portfolioEntries.map((entry, index) => (
              <Cell
                key={entry.id}
                fill={colorArray[index % colorArray.length]}
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PortfolioForm;
