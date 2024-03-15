"use client";

import { ComponentProps, useEffect, useState } from "react";
import { getTickerInfo, getTickerOptions } from "./actions";
import CreatableSelect from "react-select/creatable";
import { colors } from "@/theme";
import { Flex, Text } from "@chakra-ui/react";

interface Option {
  readonly label: string;
  readonly value: string;
}

type Props = Omit<
  ComponentProps<CreatableSelect>,
  "isLoading | options | onCreateOption | onChange | value"
> & {
  onChangeCustom: (ticker: string) => void;
  value: string;
};
const TickerSelect = (props: Props) => {
  const { value, onChangeCustom, ...rest } = props;

  const [investmentOptions, setInvestmentOptions] = useState<
    {
      value: string;
      label: string;
    }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getOptions = async () => {
        try {
            setIsLoading(true)
            const options = await getTickerOptions();
            setInvestmentOptions(options);
        } catch (err) {
            alert("Error loading investments")
        } finally {
            setIsLoading(false)
        }
    };
    getOptions();
  }, []);

  const handleCreate = async (ticker: string) => {
    try {
      setIsLoading(true);
      const tickerInfo = await getTickerInfo(ticker);
      setInvestmentOptions([
        ...investmentOptions,
        { value: ticker.toUpperCase(), label: tickerInfo.shortName },
      ]);
      onChangeCustom(ticker.toUpperCase());
    } catch (err) {
      alert("No such ticker found");
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeAdapter = (option: unknown) => {
    onChangeCustom((option as Option).value);
  };

  return (
    <CreatableSelect
      styles={{
        control: (base, state) => ({
          ...base,

          borderWidth: 2,
          borderColor: "black",
          borderRadius: 0,
          boxShadow: state.isFocused ? "none" : "5px 5px 0 black",
        }),
        option: (base, state) => ({
          ...base,
          backgroundColor: state.isFocused ? colors.hollywood[400] : "none",
          color: state.isFocused ? "white" : "black",
        }),
      }}
      formatCreateLabel={(ticker: string) => (
        <Flex flexDir={"column"}>
          <Text textColor={"black"} fontSize={"sm"}>
            Search for ticker:
          </Text>
          <Text fontWeight={600}>{ticker.toUpperCase()}</Text>
        </Flex>
      )}
      value={investmentOptions.find((opt) => opt.value === value)}
      isLoading={isLoading}
      options={investmentOptions}
      onCreateOption={handleCreate}
      onChange={onChangeAdapter}
      {...rest}
    />
  );
};

export default TickerSelect;