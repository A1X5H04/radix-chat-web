"use client";
import { useState, useRef, useEffect } from "react";
import { FullMessageType } from "@/types";
import useConversation from "@/hooks/useConversation";
import MessageTile from "./MessageTile";
import axios from "axios";
import { pusherClient } from "@/libs/pusher";
import { find, groupBy } from "lodash";
import { useStyles } from "tss-react";
import { Badge, Box, ScrollArea } from "@radix-ui/themes";
import { formatRelativeDate } from "@/libs/utils";

interface ChatBodyProps {
  initialMessage: FullMessageType[];
  isInGroup: boolean | null;
  selectMode: boolean;
  // setSelectedMessages: (value: any) => void;
  setEditMessage: (value: any) => void;
}

function ChatBody({
  initialMessage,
  isInGroup,
  selectMode,
  setEditMessage,
}: // setSelectedMessages,
ChatBodyProps) {
  const { css, cx } = useStyles();
  const [messages, setMessages] = useState<FullMessageType[]>(initialMessage);
  const bottomRef = useRef<HTMLDivElement>(null);
  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post(`/api/conversations/${conversationId}/seen`);
  }, [conversationId]);

  useEffect(() => {
    pusherClient.subscribe(conversationId);
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    const newMessageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((prevMessages) => {
        if (find(prevMessages, { id: message.id })) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const updateMessageHandler = (message: FullMessageType) => {
      console.log("updateMessageHandler", message);
      setMessages((prevMessages) =>
        prevMessages.map((currentMessage) => {
          if (currentMessage.id === message.id) {
            return message;
          }
          return currentMessage;
        })
      );
    };

    const seenMessageHandler = (message: FullMessageType) => {
      setMessages((prevMessages) =>
        prevMessages.map((currentMessage) => {
          if (currentMessage.id === message.id) {
            return message;
          }
          return currentMessage;
        })
      );
    };

    pusherClient.bind("messages:new", newMessageHandler);
    pusherClient.bind("message:update", updateMessageHandler);
    pusherClient.bind("message:seen", seenMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", newMessageHandler);
      pusherClient.bind("message:update", updateMessageHandler);
      pusherClient.unbind("message:seen", seenMessageHandler);
    };
  }, [conversationId]);

  const groupedByDateMessages = Object.entries(
    groupBy(messages, (message) => {
      const date = new Date(message.createdAt);
      const dateString = date.toISOString().split("T")[0]; // Get date string in the format 'YYYY-MM-DD'
      return dateString;
    })
  );

  return (
    <Box
      className={css({
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "var(--background)",
        backgroundImage:
          "url(https://web.telegram.org/a/chat-bg-pattern-dark.ad38368a9e8140d0ac7d.png)",
        backgroundSize: "contain",
        backgroundPosition: "center",
        backgroundRepeat: "repeat",
        backgroundAttachment: "fixed",
        "@media (prefers-color-scheme: dark)": {
          backgroundImage:
            "url(https://web.telegram.org/a/chat-bg-pattern-light.ee148af944f6580293ae.png), ",
        },
      })}
    >
      <ScrollArea scrollbars="vertical">
        <div
          className={css({
            width: "100%",
            height: "100%",
            textAlign: "center",
            flex: 1,
            paddingInline: "var(--space-3)",
            paddingTop: "var(--space-3)",
          })}
        >
          {groupedByDateMessages.map(([date, dateGroupedMessages]) => (
            <div key={date}>
              <Badge variant="soft" radius="full" size="1" my="2">
                {formatRelativeDate(date)}
              </Badge>
              {dateGroupedMessages.map((message, index) => (
                <MessageTile
                  key={message.id}
                  message={message}
                  selectMode={selectMode}
                  isInGroupChat={isInGroup}
                  setEditMessage={setEditMessage}
                  // setSelectedMessages={setSelectedMessages}
                  isLastInMessageGroup={
                    index === dateGroupedMessages.length - 1
                  }
                />
              ))}
            </div>
          ))}
        </div>
        <div ref={bottomRef} />
      </ScrollArea>
    </Box>
  );
}

export default ChatBody;
