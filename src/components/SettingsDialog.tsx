import {
  Button,
  Dialog,
  Flex,
  Text,
  Tabs,
  Box,
  ScrollArea,
} from "@radix-ui/themes";
import { User } from "@prisma/client";

function SettingsDialog({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: User;
}) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 640 }}>
        <Dialog.Title>UI Settings</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Customize your experience.
        </Dialog.Description>

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

export default SettingsDialog;
