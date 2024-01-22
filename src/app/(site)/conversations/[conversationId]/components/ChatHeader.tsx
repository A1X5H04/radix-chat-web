"use client";

import useOtherUser from "@/hooks/useOtherUser";
import { Conversation, User } from "@prisma/client";
import { Avatar, Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import { useState, useMemo } from "react";
import { RxDotsVertical, RxMagnifyingGlass, RxPerson } from "react-icons/rx";
import ProfileDrawer from "./ProfileDrawer";
import { tss } from "tss-react";
import ChatHeaderDropdown from "@/components/dropdown/ChatHeaderDropdown";
import { useRouter } from "next/navigation";

interface ChatHeaderProps {
  conversation: Conversation & {
    users: User[];
  };
  setSelectMode: (value: boolean) => void;
}

const chatHeaderStyle = tss.create({
  root: {
    backgroundColor: "var(--color-background)",
    borderBottom: "1px solid var(--accent-3)",
  },

  chatName: {
    fontWeight: 700,
    lineHeight: "calc(1rem * var(--scaling))",
  },

  chatStatus: {
    color: "var(--gray-11)",
    fontSize: "calc(0.8rem * var(--scaling))",
    fontWeight: 400,
  },
});

function ChatHeader({ conversation, setSelectMode }: ChatHeaderProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const otherUser = useOtherUser(conversation);
  const { classes } = chatHeaderStyle();
  const router = useRouter();

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`;
    } else {
      return "Online";
    }
  }, [conversation]);

  const handleClearConversation = () => {
    console.log("clear");
  };

  const handleRouterPush = () => {
    router.push("/conversations");
  };

  const handleDeleteConversation = () => {
    console.log("delete");
  };

  return (
    <Flex direction="column" className={classes.root} width="100%">
      <Flex justify="between" align="center" width="100%" px="5" py="1">
        <ProfileDrawer
          data={conversation}
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        />
        <Flex align="center" justify="center" py="2">
          <Avatar
            fallback={<RxPerson />}
            src={otherUser?.image || undefined}
            variant="solid"
          />
          <Box ml="3">
            <Heading className={classes.chatName} size="3" mt="1">
              {otherUser?.name || "Loading..."}
            </Heading>
            <Text size="2" className={classes.chatStatus}>
              {statusText}
            </Text>
          </Box>
        </Flex>
        <Box>
          <IconButton mr="5" size="2" variant="ghost" onClick={() => {}}>
            <RxMagnifyingGlass size={20} />
          </IconButton>
          <ChatHeaderDropdown
            drawerOpen={() => setIsDrawerOpen(true)}
            selectMode={() => setSelectMode(true)}
            closeConversation={handleRouterPush}
            clearConversation={handleClearConversation}
            deleteConversation={handleDeleteConversation}
          >
            <IconButton ml="5" size="2" variant="ghost">
              <RxDotsVertical size={20} />
            </IconButton>
          </ChatHeaderDropdown>
        </Box>
      </Flex>
    </Flex>
  );
}

export default ChatHeader;
