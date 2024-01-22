import { Box, Flex, Heading, IconButton, Text } from "@radix-ui/themes";
import React from "react";
import { RiCloseLine, RiEditLine, RiReplyLine } from "react-icons/ri";
import { useStyles } from "tss-react";

interface EditTileProps {
  messageBody: string;
  onClose: () => void;
}

function EditTile({ messageBody, onClose }: EditTileProps) {
  const { css } = useStyles();
  return (
    <Flex align="center" mb="2" gap="4">
      <RiEditLine />
      <Box
        className={css({
          flexGrow: 1,
          backgroundColor: "var(--accent-3)",
          borderLeft: "4px solid var(--accent-9)",
          paddingInline: "var(--space-2)",
          paddingBlock: "var(--space-1)",
          borderRadius: "var(--radius-2)",
        })}
      >
        <Flex direction="column">
          <Heading
            size="2"
            mr="2"
            className={css({
              color: "var(--accent-9)",
            })}
          >
            Edit Messages
          </Heading>
          <Text size="2">{messageBody || "Loading..."}</Text>
        </Flex>
      </Box>

      <IconButton variant="ghost" onClick={onClose}>
        <RiCloseLine />
      </IconButton>
    </Flex>
  );
}

export default EditTile;
