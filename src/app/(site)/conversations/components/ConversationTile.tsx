"use client";

import { useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FullConversationType } from "@/types";
import useOtherUser from "@/hooks/useOtherUser";
import { Avatar, Box, Flex, Heading, Text } from "@radix-ui/themes";
import { RxPerson } from "react-icons/rx";
import { tss } from "tss-react";

interface ConversationTileProps {
  data: FullConversationType;
  isSelected?: boolean;
}

const styles = tss
  .withParams<{ isSelected: boolean | undefined; hasSeen: boolean }>()
  .create(({ isSelected, hasSeen }) => ({
    userTile: {
      cursor: "pointer",
      borderRadius: "var(--radius-3)",
      backgroundColor: isSelected ? "var(--accent-7)" : "inherit",
      "&:hover": {
        backgroundColor: isSelected ? "var(--accent-7)" : "var(--accent-2)",
      },
    },

    status: {
      width: "0.5rem",
      height: "0.5rem",
      borderRadius: "50%",
      backgroundColor: "var(--accent-12)",
      border: "2px solid var(--background)",
    },
    message: {
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      width: "100%",
      maxWidth: "16rem",
      color: isSelected ? "var(--gray-11)" : "var(--gray-10)",
      fontWeight: !hasSeen ? 700 : 500,
      fontSize: "calc(12.5px * var(--scaling))",
    },
  }));

function ConversationTile({ data, isSelected }: ConversationTileProps) {
  const otherUser = useOtherUser(data);
  const session = useSession();
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data.id, router]);

  const lastMessage = useMemo(() => {
    const messages = data.messages || [];
    return messages.at(messages.length - 1);
  }, [data]);

  const userEmail = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  const hasSeen = useMemo(() => {
    if (!lastMessage) return false;
    const seenArray = lastMessage.seen || [];
    if (!userEmail) return false;
    console.log("seenArray", seenArray);
    console.log(
      "hasSeen",
      seenArray.filter((user) => user.email === userEmail).length !== 0
    );
    return seenArray.filter((user) => user.email === userEmail).length !== 0;
  }, [lastMessage, userEmail]);

  const lastMessageText = useMemo(() => {
    if (lastMessage?.image) {
      return "Image";
    }
    if (lastMessage?.body) {
      return lastMessage.body;
    }

    return "Started a conversation";
  }, [lastMessage]);

  const formattedTime = useMemo(() => {
    if (!lastMessage) {
      return new Date(data.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    } else {
      const date = new Date(lastMessage.createdAt);
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      const formattedHours = hours % 12 || 12;
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      return `${formattedHours}:${formattedMinutes} ${ampm}`;
    }
  }, [lastMessage, data.createdAt]);

  const { classes } = styles({ isSelected, hasSeen });

  return (
    <Flex
      p="2"
      my="2"
      align="center"
      onClick={handleClick}
      className={classes.userTile}
    >
      <Avatar fallback={<RxPerson />} src={otherUser.image || undefined} />
      <Flex direction="column" width="100%" mx="3">
        <Flex justify="between" align="center" width="100%">
          <Heading size="2" mb="1" weight="bold">
            {otherUser.name}
          </Heading>
          <Text
            size="1"
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {formattedTime}
          </Text>
        </Flex>
        <Flex justify="between" align="center" width="100%">
          <Text className={classes.message}>{lastMessageText}</Text>
          {!hasSeen && <Box className={classes.status} />}
        </Flex>
      </Flex>
    </Flex>
  );
}

export default ConversationTile;
