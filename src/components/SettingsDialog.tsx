import {
  Button,
  Dialog,
  Flex,
  Text,
  Tabs,
  Box,
  ScrollArea,
} from "@radix-ui/themes";
import ThemeTab from "./ThemeTab";

function SettingsDialog({ children }: { children: React.ReactNode }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 640 }}>
        <Dialog.Title>Settings</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Customize your experience.
        </Dialog.Description>

        <Tabs.Root defaultValue="account">
          <Tabs.List>
            <Tabs.Trigger value="account">Profile</Tabs.Trigger>
            <Tabs.Trigger value="theme">Theme</Tabs.Trigger>
            <Tabs.Trigger value="settings">Settings</Tabs.Trigger>
          </Tabs.List>
          <ScrollArea scrollbars="vertical" style={{ height: 250 }}>
            <Box px="4" pt="3" pb="2">
              <Tabs.Content value="account">
                <Text size="2">Make changes to your account.</Text>
              </Tabs.Content>

              <Tabs.Content value="theme">
                <ThemeTab />
              </Tabs.Content>

              <Tabs.Content value="settings">
                <Text size="2">
                  Edit your profile or update contact information.
                </Text>
              </Tabs.Content>
            </Box>
          </ScrollArea>
        </Tabs.Root>

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
