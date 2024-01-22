import { Conversation, Message, User } from "@prisma/client";

export type FullMessageType = Message & {
  sender: User;
  seen: User[];
};

export type FullConversationType = Conversation & {
  users: User[];
  messages: FullMessageType[];
};

export type ThemeConfig = {
  accentColor:
    | "tomato"
    | "red"
    | "ruby"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "brown"
    | "orange"
    | "sky"
    | "mint"
    | "lime"
    | "yellow"
    | "amber"
    | "gold"
    | "bronze"
    | "gray";
  grayColor: "gray" | "mauve" | "slate" | "sage" | "olive" | "sand" | "auto";
  appearance: "dark" | "light";
  radius: "none" | "small" | "medium" | "large" | "full";
  panelBackground: "solid" | "translucent";
  scaling: "90%" | "95%" | "100%" | "105%" | "110%";
};
