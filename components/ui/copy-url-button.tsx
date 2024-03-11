"use client";

import React, { useState } from "react";

import { Button, ButtonProps } from "@chakra-ui/react";
import { FaCheck, FaCopy } from "react-icons/fa";

type Props = Omit<ButtonProps, "onClick" | "rightIcon">;

const CopyUrlButton = (props: Props) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
  };
  return (
    <Button
      onClick={handleCopy}
      rightIcon={copied ? <FaCheck /> : <FaCopy />}
      {...props}
    />
  );
};

export default CopyUrlButton;
