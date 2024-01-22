"use client";

import React from "react";
import useConversation from "@/hooks/useConversation";
import Image from "next/image";
import { Grid, Heading, Text, Flex } from "@radix-ui/themes";

function EmptyState() {
  const { isOpen } = useConversation();

  if (!isOpen)
    return (
      <Grid
        align="center"
        width="100%"
        height="100%"
        px="3"
        py={{
          initial: "4",
          sm: "6",
        }}
        style={{
          backgroundColor: "var(--accent-1)",
        }}
      >
        <Flex align="center" direction="column" justify="center">
          <Image src="/empty-state.svg" width={450} height={450} alt="Hello" />
          <Heading size="6" as="h5" mt="1">
            Welcome to Radix Chat!
          </Heading>
          <Text size="2" color="gray">
            Select a chat or start a new conversation
          </Text>
        </Flex>
      </Grid>
    );

  return (
    <Grid
      align="center"
      width="100%"
      height="100%"
      px="3"
      py={{
        initial: "4",
        sm: "6",
      }}
      style={{
        backgroundColor: "var(--color-surface-accent)",
      }}
    >
      <Flex align="center" direction="column" justify="center">
        <Image src="/empty-state.svg" width={450} height={450} alt="Hello" />
        <Heading size="6" as="h5" mt="1">
          Welcome to Radix Chat!
        </Heading>
        <Text size="2" color="gray">
          Select a chat or start a new conversation
        </Text>
      </Flex>
    </Grid>
  );
}

export default EmptyState;
