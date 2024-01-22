import { DropdownMenu } from "@radix-ui/themes";
import React from "react";

interface ChatHeaderDropdownProps {
  children: React.ReactNode;
  drawerOpen: () => void;
  selectMode: () => void;
  closeConversation: () => void;
  clearConversation: () => void;
  deleteConversation: () => void;
}

function ChatHeaderDropdown({
  children,
  drawerOpen,
  selectMode,
  closeConversation,
  clearConversation,
  deleteConversation,
}: ChatHeaderDropdownProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={drawerOpen}>Profile Info</DropdownMenu.Item>
        {/* <DropdownMenu.Item>Mute Notifications</DropdownMenu.Item>
        <DropdownMenu.Item onClick={selectMode}>
          Select Messages
        </DropdownMenu.Item> */}
        <DropdownMenu.Separator />
        {/* <DropdownMenu.Item onClick={clearConversation}>
          Clear Conversation
        </DropdownMenu.Item> */}
        <DropdownMenu.Item onClick={closeConversation}>
          Close Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item onClick={deleteConversation} color="red">
          Delete Conversation
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
}

export default ChatHeaderDropdown;
