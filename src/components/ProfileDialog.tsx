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
import EmojiPicker from "./EmojiPicker";
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
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
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
            <Box position="relative" m="3" onClick={() => alert("clicked")}>
              <Avatar
                fallback={<RxPerson size="25" />}
                src={currentImage || currentUser?.image || undefined}
                size="6"
              />
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
              Status
            </Text>
            <TextField.Root mt="1">
              <TextField.Slot>
                <IconButton
                  onClick={() => setShowEmojiPicker((prev) => !prev)}
                  variant="ghost"
                >
                  <MdOutlineEmojiEmotions />
                </IconButton>
              </TextField.Slot>
              <TextField.Input
                {...register("status", { required: true })}
                id="image"
                placeholder="Your mood today"
              />
            </TextField.Root>
            <Box position="relative">{showEmojiPicker && <EmojiPicker />}</Box>
          </Box>
          <Box mt="-1">
            <Text size="2" weight="bold">
              Bio
            </Text>
            <TextArea
              mt="1"
              {...register("bio", { required: true })}
              rows={3}
              placeholder="I like to code."
              maxLength={100}
            />
          </Box>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
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
