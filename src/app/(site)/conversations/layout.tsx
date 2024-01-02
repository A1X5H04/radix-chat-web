import React from "react";
import { Flex } from "@radix-ui/themes";

import NavLayout from "@/components/navlayout/NavLayout";
import ConversationList from "./components/ConversationList";
import getConversations from "@/actions/getConversations";
import getUsers from "@/actions/getUsers";

async function ConversationLayout({ children }: { children: React.ReactNode }) {
  const conversation = await getConversations();
  const users = await getUsers();
  return (
    <NavLayout>
      <Flex
        display={{
          initial: "none",
          sm: "flex",
        }}
        width="100%"
        height="100%"
      >
        <ConversationList initialItems={conversation} users={users} />
        {children}
      </Flex>
    </NavLayout>
  );
}

export default ConversationLayout;
