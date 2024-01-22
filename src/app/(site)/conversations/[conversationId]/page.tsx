import getConversationbyId from "@/actions/getConversationbyId";
import getMessages from "@/actions/getMessages";
import EmptyState from "@/components/EmptyState";
import { Flex } from "@radix-ui/themes";
import React from "react";
import ChatHeader from "./components/ChatHeader";
import ChatBody from "./components/ChatBody";
import ChatInput from "./components/ChatFooter";
import ChatScreen from "./components/ChatScreen";

interface Params {
  conversationId: string;
}

async function ConversationId({ params }: { params: Params }) {
  const conversation = await getConversationbyId(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return <EmptyState />;
  }

  return (
    <ChatScreen
      conversation={conversation}
      initialMessages={messages}
      isInGroup={conversation.isGroup}
    />
  );
}

export default ConversationId;
