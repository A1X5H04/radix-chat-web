"use client";

import { useState } from "react";
import { Flex } from "@radix-ui/themes";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import { tss } from "tss-react";
import { Conversation, User } from "@prisma/client";
import { FullMessageType } from "@/types";

interface ChatScreenProps {
  conversation: Conversation & {
    users: User[];
  };
  initialMessages: FullMessageType[];
  isInGroup: boolean | null;
}

const chatScreenStyle = tss.create({
  root: {
    backgroundColor: "var(--color-surface-accent)",
    borderLeft: "1px solid var(--accent-3)",
  },
});

function ChatScreen({
  conversation,
  initialMessages,
  isInGroup,
}: ChatScreenProps) {
  const { classes } = chatScreenStyle();

  return (
    <Flex
      align="center"
      direction="column"
      justify="between"
      width="100%"
      height="100%"
      className={classes.root}
    >
      <ChatHeader conversation={conversation} />
      <ChatBody initialMessage={initialMessages} isInGroup={isInGroup} />
      <ChatInput />
    </Flex>
  );
}

export default ChatScreen;
