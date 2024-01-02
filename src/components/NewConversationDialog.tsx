import { User } from "@prisma/client";
import { Dialog, Flex, TextField, Text, Button } from "@radix-ui/themes";
import React from "react";

interface NewConversationDialogProps {
  children: React.ReactNode;
  users: User[];
}

function NewConversationDialog({ children }: NewConversationDialogProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create A Group</Dialog.Title>
        <Dialog.Description size="2" mb="4" mt="-2">
          Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Group Name
            </Text>
            <TextField.Input placeholder="Radix Chat Group" />
          </label>
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Email
            </Text>
            <TextField.Input
              defaultValue="freja@example.com"
              placeholder="Enter your email"
            />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button>Save</Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default NewConversationDialog;
