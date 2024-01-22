"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Dialog,
  DropdownMenu,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  TextField,
} from "@radix-ui/themes";
import ConversationTile from "./ConversationTile";
// import { RiFilter3Line, RiSearchLine } from "react-icons/ri";
import useConversation from "@/hooks/useConversation";
import { FullConversationType } from "@/types";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/libs/pusher";
import { useStyles } from "tss-react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import AddGroupDialog from "@/components/AddGroupDialog";

interface ConversationListProps {
  initialItems: FullConversationType[];
  users: User[];
}

function ConversationList({ initialItems, users }: ConversationListProps) {
  const router = useRouter();
  const session = useSession();
  const { css } = useStyles();
  const [items, setItems] = useState(initialItems);
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    const newConversationHandler = (conversation: FullConversationType) => {
      setItems((prevItems) => {
        if (prevItems.find((item) => item.id === conversation.id)) {
          return prevItems;
        }
        return [conversation, ...prevItems];
      });
    };

    const updateConversationHandler = (
      newConversation: FullConversationType
    ) => {
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
    <Dialog.Root>
      <Box
        className={css({
          width: "100%",
          height: "100%",
          maxWidth: "25rem",
          overflow: "hidden",
        })}
      >
        <Flex px="5" justify="between" py="6" align="center">
          <Heading size="5">Conversations</Heading>
          <AddGroupDialog users={users}>
            <IconButton size="1" variant="soft">
              <AiOutlineUsergroupAdd />
            </IconButton>
          </AddGroupDialog>
        </Flex>

        {/* <TextField.Root mb="3" mx="5">
          <TextField.Slot>
            <RiSearchLine />
          </TextField.Slot>
          <TextField.Input placeholder="Search Conversations..." />
          <TextField.Slot>
            <IconButton variant="ghost">
              <RiFilter3Line />
            </IconButton>
          </TextField.Slot>
        </TextField.Root> */}
        <ScrollArea type="auto" scrollbars="vertical">
          <Box mt="4" mx="4">
            {items.length == 0
              ? "No Items to Show"
              : items.map((item) => {
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
    </Dialog.Root>
  );
}

export default ConversationList;
