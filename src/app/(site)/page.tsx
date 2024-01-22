"use client";

import { Card, Container, Flex, Heading } from "@radix-ui/themes";
import AuthForm from "./components/AuthForm";
import Image from "next/image";
import { tss } from "tss-react";

const registerStyles = tss.create({
  authContainer: {
    margin: 0,
    padding: 0,
    height: "100vh",
    display: "grid",
    placeContent: "center",
    placeItems: "center",
    backgroundImage: 'url("/authbg.svg")',
    backgroundAttachment: "fixed",
    backgroundSize: "cover",
  },

  authModal: {
    padding: "1rem",
    width: "25rem",
    "@media screen and (max-width: 768px)": {
      width: "20rem",
    },
  },
});

export default function Register() {
  const { classes } = registerStyles();
  return (
    <Container className={classes.authContainer}>
      <Flex
        align="center"
        gap="2"
        style={{
          position: "absolute",
          top: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Image src="/logo.svg" alt="fasdf" width="30" height="30" />
        <Heading as="h1" size="4">
          Radix Chat
        </Heading>
      </Flex>
      <Card m="2" className={classes.authModal}>
        <AuthForm />
      </Card>
    </Container>
  );
}
