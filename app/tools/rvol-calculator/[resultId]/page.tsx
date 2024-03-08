import React from "react";

type Props = {
    params: {
      resultId: string;
    };
  };

const RiskCalculatorResults = (props: Props) => {
  return <pre>{JSON.stringify(props, null, 2)}</pre>;
};

export default RiskCalculatorResults;
