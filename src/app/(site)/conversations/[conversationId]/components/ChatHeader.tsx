"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { Avatar, Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { useState, useMemo } from "react";
import { RxDotsVertical, RxMagnifyingGlass, RxPerson } from "react-icons/rx";
import ProfileDrawer from "./ProfileDrawer";
import { tss } from "tss-react";

interface ChatHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
}

const chatHeaderStyle = tss.create({
  root: {
    backgroundColor: "var(--color-background)",
    borderBottom: "1px solid var(--gray-5)",
  },

  chatName: {
    fontSize: "calc(1.2rem * var(--scaling))",
    fontWeight: 700,
    lineHeight: "1.5rem",
  },

  chatStatus: {
    fontSize: "calc(0.8rem * var(--scaling))",
    fontWeight: 400,
  },
});

function ChatHeader({ conversation }: ChatHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const { classes } = chatHeaderStyle();

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    } else {
      return "Online";
    }
  }, [conversation]);

  return (
    <Flex
      justify="between"
      align="center"
      width="100%"
      px="5"
      py="1"
      className={classes.root}
    >
      <ProfileDrawer
        data={conversation}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <Flex align="center" justify="center">
        <Avatar
          size="4"
          fallback={<RxPerson />}
          src={otherUser?.image || undefined}
          variant="solid"
        />
        <Box ml="3" py="3">
          <Heading size="3">{otherUser?.name || "Loading..."}</Heading>
          <Text size="2" className={classes.chatStatus}>
            {statusText}
          </Text>
        </Box>
      </Flex>
      <Box>
        <IconButton mr="5" size="2" variant="ghost" onClick={() => {}}>
          <RxMagnifyingGlass size={20} />
        </IconButton>

        <IconButton
          ml="5"
          size="2"
          variant="ghost"
          onClick={() => setIsDrawerOpen(true)}
        >
          <RxDotsVertical size={20} />
        </IconButton>
      </Box>
    </Flex>
  );
}

export default ChatHeader;
