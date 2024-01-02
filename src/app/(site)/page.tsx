"use client";

import { Card, Container, Flex, Heading } from "@radix-ui/themes";
import AuthForm from "./components/AuthForm";
import styles from "@/styles/auth.module.css";
import Image from "next/image";

export default function Register() {
  return (
    <Container className={styles.authContainer}>
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
      <Card m="2" className={styles.authModal}>
        <AuthForm />
      </Card>
    </Container>
  );
}
