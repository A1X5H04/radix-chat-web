"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  Link as RadixLink,
  Text,
  Callout,
} from "@radix-ui/themes";
import { RxInfoCircled } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { FieldValues, SubmitHandler, set, useForm } from "react-hook-form";
import Input from "@/components/Input";
import SocialButton from "./SocialButton";
import { RiErrorWarningLine, RiGithubFill, RiGoogleFill } from "react-icons/ri";

function AuthForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [callOut, setCallOut] = useState({
    text: "",
    isError: false,
  });
  const [authType, setAuthType] = useState<"login" | "register">("login");
  const session = useSession();
  const router = useRouter();

  function toggleAuthType() {
    setAuthType((prev) => (prev === "login" ? "register" : "login"));
  }

  const socialAction = (action: string) => {
    signIn(action, { redirect: false }).then((callback) => {
      if (callback?.error) {
        console.log(callback.error);
      }
      if (callback?.ok && !callback?.error) {
        console.log(callback.ok);
        setCallOut({ text: "Successfully logged in!", isError: false });
        router.push("/conversations");
      }
    });
  };

  useEffect(() => {
    if (session?.status === "authenticated") {
      setIsLoading(true);
      setCallOut({ text: "Logging you in...", isError: false });
      router.push("/conversations");
    }
  }, [session, router]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (authType === "register") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            console.error("Invalid credentials!");
            setCallOut({ text: "Invalid Credentials!", isError: true });
          }

          if (callback?.ok) {
            setCallOut({ text: "Successfully Registered!", isError: false });
            router.push("/users");
          }
        })
        .catch(() => {
          setCallOut({ text: "Something Went Wrong!", isError: true });
        })
        .finally(() => setIsLoading(false));
    }

    if (authType === "login") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            setCallOut({ text: "Invalid Credentials!", isError: true });
            console.error("Invalid credentials!");
          }

          if (callback?.ok) {
            setCallOut({ text: "Successfully Logged In!", isError: false });
            router.push("/users");
          }
        })
        .catch(() =>
          setCallOut({ text: "Something Went Wrong!", isError: true })
        )
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <Box>
      {callOut.text && (
        <Callout.Root color={callOut.isError ? "red" : undefined}>
          <Callout.Icon>
            {callOut.isError ? <RiErrorWarningLine /> : <RxInfoCircled />}
          </Callout.Icon>
          <Callout.Text>{callOut.text}</Callout.Text>
        </Callout.Root>
      )}
      <Flex justify="center" my="5">
        <SocialButton
          onClick={() => socialAction("github")}
          text="GitHub"
          icon={<RiGithubFill />}
        />
        <SocialButton
          onClick={() => socialAction("google")}
          text="Google"
          icon={<RiGoogleFill />}
        />
      </Flex>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)}>
          {authType === "register" && (
            <Input
              id="name"
              label="Name"
              placeholder="John Doe"
              errors={errors}
              register={register}
              disabled={isLoading}
            />
          )}
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="johndoe@example.com"
            errors={errors}
            register={register}
            disabled={isLoading}
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="securepassword123"
            errors={errors}
            register={register}
            disabled={isLoading}
          />

          <Flex align="center" justify="between" mt="5">
            <Text size="1">
              {authType === "login" ? "New to Radix Chat?" : "Already a user?"}
              &nbsp;
              <RadixLink onClick={toggleAuthType}>
                {authType === "login" ? "Register" : "Login"}
              </RadixLink>
            </Text>
            <Button
              disabled={isLoading}
              onClick={() => setCallOut({ text: "", isError: false })}
            >
              {authType === "login" ? "Login" : "Register"} to Radix Chat
            </Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default AuthForm;
