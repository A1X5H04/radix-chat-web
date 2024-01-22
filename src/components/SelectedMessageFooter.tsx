import { Flex, IconButton, Text } from "@radix-ui/themes";
import { PiStarFill, PiCopyFill, PiTrashFill } from "react-icons/pi";
import { RiCloseFill } from "react-icons/ri";

function SelectedMessageFooter({
  selectedMessagesLength,
  setSelectMode,
}: {
  selectedMessagesLength: number;
  setSelectMode: (value: boolean) => void;
}) {
  return (
    <Flex justify="between" align="center" width="100%">
      <Flex align="center">
        <IconButton onClick={() => setSelectMode(false)} variant="ghost">
          <RiCloseFill />
        </IconButton>
        <Text ml="6" weight="medium">
          {selectedMessagesLength}&nbsp;
          {selectedMessagesLength > 1 ? "messages" : "message"} selected
        </Text>
      </Flex>
      <Flex gap="4">
        <IconButton variant="soft">
          <PiStarFill />
        </IconButton>
        <IconButton variant="soft">
          <PiCopyFill />
        </IconButton>
        <IconButton variant="soft" color="red">
          <PiTrashFill />
        </IconButton>
      </Flex>
    </Flex>
  );
}

export default SelectedMessageFooter;
