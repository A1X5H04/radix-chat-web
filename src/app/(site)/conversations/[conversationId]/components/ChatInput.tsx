"use client";

import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Flex, IconButton, TextField } from "@radix-ui/themes";

import useConversation from "@/hooks/useConversation";
import { RxImage } from "react-icons/rx";
import { BiSolidSend } from "react-icons/bi";
import { CldUploadWidget } from "next-cloudinary";

function ChatInput() {
  const { conversationId } = useConversation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setValue("message", "", { shouldValidate: true });
    axios.post(`/api/messages`, {
      ...data,
      conversationId,
    });
  };

  const handleUpload = (result: any) => {
    axios.post(`/api/messages`, {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <Flex
      justify="between"
      align="center"
      width="100%"
      px="5"
      py="4"
      mt="2"
      style={{
        borderTop: "1px solid var(--accent-3)",
        backgroundColor: "var(--color-background)",
      }}
    >
      <CldUploadWidget
        options={{ maxFiles: 1 }}
        onUpload={handleUpload}
        uploadPreset="gsdh6mzb"
      >
        {({ open }) => (
          <IconButton onClick={() => open()} mr="3" size="3" variant="soft">
            <RxImage size="20" />
          </IconButton>
        )}
      </CldUploadWidget>
      <form style={{ flex: 1 }} onSubmit={handleSubmit(onSubmit)}>
        <Flex align="center" justify="center" width="100%">
          <TextField.Root size="3" variant="soft" style={{ width: "100%" }}>
            <TextField.Input
              id="message"
              {...register("message", { required: true })}
              placeholder="Type a message..."
              required
              style={{ wordBreak: "break-word" }}
              autoComplete="off"
            />
          </TextField.Root>
          <IconButton ml="4" size="3" type="submit">
            <BiSolidSend />
          </IconButton>
        </Flex>
      </form>
    </Flex>
  );
}

export default ChatInput;
