import React from "react";
import Link from "next/link";
import { Box, IconButton, Tooltip, Text } from "@radix-ui/themes";
import { tss } from "tss-react";

interface DesktopItemProps {
  label: string;
  icon: any;
  href: string;
  active?: boolean;
}

const desktopItemStyles = tss.create({
  iconButton: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "var(--accent-5)",
    width: 40,
    height: 40,
    borderRadius: "max(var(--radius-3), var(--radius-full))",
    transition: "background-color 0.4s ease",
    "&::before": {
      content: "''",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      left: -13,
      width: "3px",
      borderTopRightRadius: "inherit",
      borderBottomRightRadius: "inherit",
      height: "50%",
      opacity: 0,
      backgroundColor: "var(--accent-11)",
      transition: "opacity 4s ease",
    },
    "&:hover": {
      backgroundColor: "var(--gray-1)",
    },
    "&[data-active=true]": {
      transform: "scale(1.2)",
      color: "var(--accent-9)",
    },
    "&[data-active=true]::before": {
      opacity: 1,
    },
  },

  srOnly: {
    position: "absolute",
    width: 1,
    height: 1,
    padding: 0,
    margin: -1,
    overflow: "hidden",
    clip: "rect(0, 0, 0, 0)",
    whiteSpace: "nowrap",
    border: 0,
  },
});

function DesktopItem({ label, icon: Icon, href, active }: DesktopItemProps) {
  const { classes } = desktopItemStyles();

  return (
    <li
      style={{
        marginBlock: "2.5rem",
      }}
    >
      <Tooltip content={label} side="right">
        <Link href={href}>
          <Box className={classes.iconButton} data-active={active}>
            <Icon />
            <Text as="span" className={classes.srOnly}>
              {label}
            </Text>
          </Box>
        </Link>
      </Tooltip>
    </li>
  );
}

export default DesktopItem;
