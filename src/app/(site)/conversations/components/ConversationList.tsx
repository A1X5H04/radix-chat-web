"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  TextField,
} from "@radix-ui/themes";

import styles from "@/styles/homepage.module.css";
import ConversationTile from "./ConversationTile";
import { RiAddLine, RiFilter3Line, RiSearchLine } from "react-icons/ri";
import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { tss } from "tss-react";
import AddGroupDialog from "@/components/NewConversationDialog";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const conversationListStyles = tss.create({
  userList: {
    width: "100%",
    height: "100%",
    maxWidth: "25rem",
    overflow: "hidden",
  },
});

function ConversationList({ initialItems, users }: ConversationListProps) {
  const router = useRouter();
  const session = useSession();
  const { classes } = conversationListStyles();
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const newConversationHandler = (conversation: FullConversationType) => {
    setItems((prevItems) => {
      if (prevItems.find((item) => item.id === conversation.id)) {
        return prevItems;
      }
      return [conversation, ...prevItems];
    });
  };

  const updateConversationHandler = (newConversation: FullConversationType) => {
    setItems((prevConversation) =>
      prevConversation.map((currentConversation) => {
        if (currentConversation.id === newConversation.id) {
          return {
            ...currentConversation,
            messages: newConversation.messages,
          };
        }
        return currentConversation;
      })
    );
  };

  const removeConversationHandler = (conversation: FullConversationType) => {
    setItems((prevConversation) => {
      return [
        ...prevConversation.filter(
          (conversation) => conversation.id !== conversationId
        ),
      ];
    });

    if (conversationId === conversation.id) {
      router.push("/conversations");
    }
  };

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);
    pusherClient.bind("conversation:new", newConversationHandler);
    pusherClient.bind("conversation:update", updateConversationHandler);
    pusherClient.bind("conversation:delete", removeConversationHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newConversationHandler);
      pusherClient.unbind("conversation:update", updateConversationHandler);
      pusherClient.unbind("conversation:delete", removeConversationHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <Box className={classes.userList}>
      <Flex px="5" justify="between" py="6" align="center">
        <Heading size="5">Conversations</Heading>
        <AddGroupDialog users={users}>
          <IconButton size="1" variant="soft">
            <RiAddLine />
          </IconButton>
        </AddGroupDialog>
      </Flex>
      <TextField.Root mb="3" mx="5">
        <TextField.Slot>
          <RiSearchLine />
        </TextField.Slot>
        <TextField.Input placeholder="Search Conversations..." />
        <TextField.Slot>
          <IconButton variant="ghost">
            <RiFilter3Line />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      <ScrollArea type="auto" scrollbars="vertical">
        <Box mt="4" mx="4">
          {items.map((item) => {
            return (
              <ConversationTile
                key={item.id}
                data={item}
                isSelected={conversationId === item.id}
              />
            );
          })}
        </Box>
      </ScrollArea>
    </Box>
  );
}

export default ConversationList;
