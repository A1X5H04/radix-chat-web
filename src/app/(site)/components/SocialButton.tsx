import { IconButton, Text } from "@radix-ui/themes";
import React from "react";

interface SocialButtonProps {
  onClick: () => void;
  text: string;
  icon: React.ReactNode;
}

function SocialButton({ onClick, text, icon }: SocialButtonProps) {
  return (
    <IconButton
      onClick={onClick}
      style={{
        flex: 1,
      }}
      variant="surface"
      mx="1"
    >
      {icon}

      <Text size="2" mx="1">
        {text}
      </Text>
    </IconButton>
  );
}

export default SocialButton;
