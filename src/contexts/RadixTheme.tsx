"use client";

import { useState } from "react";
import { themeAccentColorsOrdered } from "@radix-ui/themes";

interface ThemeConfig {
  accentColor: typeof themeAccentColorsOrdered;
  grayColor:
    | "gray"
    | "mauve"
    | "slate"
    | "sage"
    | "olive"
    | "sand"
    | "auto"
    | undefined;
  appearance: "dark" | "light";
  radius: "none" | "small" | "medium" | "large" | "full";
  panelBackground: "solid" | "translucent";
  scaling: "90%" | "95%" | "100%" | "105%" | "110%";
}

import { Theme } from "@radix-ui/themes";

export default function RadixTheme({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<ThemeConfig>({
    accentColor: themeAccentColorsOrdered,
    grayColor: "auto",
    appearance: "dark",
    radius: "medium",
    panelBackground: "translucent",
    scaling: "100%",
  });

  return (
    <Theme
      accentColor={theme.accentColor.at(0)}
      appearance={theme.appearance}
      grayColor={theme.grayColor}
      radius={theme.radius}
      panelBackground={theme.panelBackground}
      scaling={theme.scaling}
    >
      {children}
    </Theme>
  );
}
