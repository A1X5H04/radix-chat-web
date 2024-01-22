"use client";

import {
  Avatar,
  Box,
  Button,
  Dialog,
  Flex,
  Text,
  IconButton,
  TextArea,
  TextField,
} from "@radix-ui/themes";
import React from "react";
import { RiAddLine } from "react-icons/ri";
import { RxPerson } from "react-icons/rx";
import Input from "./Input";
import { FieldValues, useForm } from "react-hook-form";
import { User } from "@prisma/client";
import { MdOutlineEmojiEmotions } from "react-icons/md";
import { useStyles } from "tss-react";

interface ProfileDialogProps {
  children: React.ReactNode;
  currentUser: User;
}

function ProfileDialog({ children, currentUser }: ProfileDialogProps) {
  const { css } = useStyles();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
      bio: currentUser?.bio,
    },
  });

  const currentImage = watch("image");

  function handleUpload() {}

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description size="2" mb="6" mt="-1">
          Make changes to your profile.
        </Dialog.Description>

        <Flex direction="column" width="100%" gap="3">
          <Flex justify="center">
            <Box position="relative" m="3">
              <Avatar
                fallback={<RxPerson size="25" />}
                src={currentImage || currentUser?.image || undefined}
                size="6"
              />
              <IconButton
                className={css({
                  position: "absolute",
                  bottom: 0,
                  right: "50%",
                  transform: "translate(50%, 50%)",
                  cursor: "pointer",
                })}
                onClick={handleUpload}
                size="1"
              >
                <RiAddLine />
              </IconButton>
            </Box>
          </Flex>
          <Input
            label="Profile Name"
            placeholder="John Doe"
            register={register}
            errors={errors}
            disabled={false}
            id={"name"}
          />
          <Box mt="-3">
            <Text size="2" weight="bold">
              Profile Bio
            </Text>
            <TextArea
              id="bio"
              {...register("bio", { required: true })}
              mt="1"
              rows={3}
              placeholder="I like to code."
              maxLength={100}
            />
          </Box>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button type="button" variant="soft" color="gray">
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

export default ProfileDialog;
