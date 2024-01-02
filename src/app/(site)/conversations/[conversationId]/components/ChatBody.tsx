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
}

function ChatBody({ initialMessage, isInGroup }: ChatBodyProps) {
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

    const messageHandler = (message: FullMessageType) => {
      axios.post(`/api/conversations/${conversationId}/seen`);

      setMessages((prevMessages) => {
        if (find(prevMessages, { id: message.id })) {
          return prevMessages;
        }
        return [...prevMessages, message];
      });
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
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

    pusherClient.bind("messages:new", messageHandler);
    pusherClient.bind("message:seen", seenMessageHandler);
    return () => {
      pusherClient.unsubscribe(conversationId);
      pusherClient.unbind("messages:new", messageHandler);
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
    <ScrollArea scrollbars="vertical">
      <div
        className={cx(
          css({
            width: "100%",
            height: "100%",
            textAlign: "center",
            flex: 1,
            paddingInline: "var(--space-3)",
            paddingTop: "var(--space-3)",
          })
        )}
      >
        <div>
          {groupedByDateMessages.map(([date, dateGroupedMessages]) => (
            <div key={date}>
              <Badge variant="outline" radius="full" size="2" my="2">
                {formatRelativeDate(date)}
              </Badge>
              {dateGroupedMessages.map((message, index) => (
                <MessageTile
                  key={message.id}
                  message={message}
                  isInGroupChat={isInGroup}
                  isLastInMessageGroup={
                    index === dateGroupedMessages.length - 1
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div ref={bottomRef} />
    </ScrollArea>
  );
}

export default ChatBody;
