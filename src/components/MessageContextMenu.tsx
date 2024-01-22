import { FullMessageType } from "@/types";
import { AlertDialogTrigger, ContextMenu } from "@radix-ui/themes";
import axios from "axios";
import { set } from "lodash";
import React from "react";

interface MessageContextMenuProps {
  children: React.ReactNode;
  setEditMessage: (value: any) => void;
  isMe: boolean;
  data: FullMessageType;
}

function MessageContextMenu({
  children,
  setEditMessage,
  isMe,
  data,
}: MessageContextMenuProps) {
  const handleMessageDelete = () => {
    axios.delete(`/api/messages/${data.id}`);
    alert("Message deleted" + data.id);
  };

  const handleMessageCopy = () => {
    const messageSender = data.sender?.name;
    const messageText = data?.body;
    const text = `${messageSender}:\n${messageText}`;
    navigator.clipboard.writeText(text);
    alert("Message copied to clipboard");
  };

  const handleMessageEdit = () => {
    setEditMessage({
      id: data.id,
      body: data.body,
    });
  };

  const handleMessageStar = () => {
    axios.post(`/api/messages/${data.id}/star`);
  };

  return (
    <>
      <ContextMenu.Trigger>{children}</ContextMenu.Trigger>
      <ContextMenu.Content>
        {!data.image && (
          <ContextMenu.Item onClick={handleMessageCopy}>Copy</ContextMenu.Item>
        )}
        {isMe && !data.image && (
          <ContextMenu.Item onClick={handleMessageEdit}>Edit</ContextMenu.Item>
        )}
        <ContextMenu.Item onClick={handleMessageStar}>Star</ContextMenu.Item>
        <ContextMenu.Item onClick={handleMessageDelete} color="red">
          Delete
        </ContextMenu.Item>
      </ContextMenu.Content>
    </>
  );
}

export default MessageContextMenu;
