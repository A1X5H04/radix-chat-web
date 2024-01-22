"use client";

import { useState } from "react";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import ChatHeader from "./ChatHeader";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
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
    borderLeft: "1px solid var(--gray-5)",
  },
});

function ChatScreen({
  conversation,
  initialMessages,
  isInGroup,
}: ChatScreenProps) {
  const { classes } = chatScreenStyle();
  const [isSelectMode, setIsSelectMode] = useState(false);
  // const [selectedMessages, setSelectedMessages] = useState([]);
  const [editMessage, setEditMessage] = useState(null);
  return (
    <AlertDialog.Root>
      <Flex
        align="center"
        direction="column"
        justify="between"
        width="100%"
        height="100%"
        className={classes.root}
      >
        <ChatHeader
          conversation={conversation}
          setSelectMode={setIsSelectMode}
        />
        <ChatBody
          initialMessage={initialMessages}
          isInGroup={isInGroup}
          selectMode={isSelectMode}
          setEditMessage={setEditMessage}
          // setSelectedMessages={setSelectedMessages}
        />
        <ChatFooter
          selectMode={isSelectMode}
          setSelectMode={setIsSelectMode}
          editMessage={editMessage}
          setEditMessage={setEditMessage}
          // selectedMessagesLength={selectedMessages.length}
        />
      </Flex>
    </AlertDialog.Root>
  );
}

export default ChatScreen;
