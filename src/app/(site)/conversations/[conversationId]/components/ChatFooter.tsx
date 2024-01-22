"use client";

import axios from "axios";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Button, Flex, IconButton, TextField, Box } from "@radix-ui/themes";

import useConversation from "@/hooks/useConversation";
import { RxImage } from "react-icons/rx";
import { BiSolidSend } from "react-icons/bi";
import { CldUploadWidget } from "next-cloudinary";
import SelectedMessageFooter from "@/components/SelectedMessageFooter";
import EditTile from "@/components/EditTile";

function ChatFooter({
  selectMode,
  setSelectMode,
  editMessage,
  setEditMessage,
  selectedMessagesLength,
}: any) {
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
    if (editMessage) {
      setValue("message", "", { shouldValidate: true });
      axios.put(`/api/messages/${editMessage.id}`, {
        ...data,
        conversationId,
      });
      setEditMessage(false);
    } else {
      setValue("message", "", { shouldValidate: true });
      axios.post(`/api/messages`, {
        ...data,
        conversationId,
      });
    }
  };

  const handleUpload = (result: any) => {
    axios.post(`/api/messages`, {
      image: result?.info?.secure_url,
      conversationId,
    });
  };

  return (
    <Box
      width="100%"
      px="5"
      py="3"
      style={{
        borderTop: "1px solid var(--accent-3)",
        backgroundColor: "var(--color-background)",
      }}
    >
      {selectMode ? (
        <SelectedMessageFooter
          selectedMessagesLength={selectedMessagesLength}
          setSelectMode={setSelectMode}
        />
      ) : (
        <Box>
          {editMessage && (
            <EditTile
              messageBody={editMessage.body}
              onClose={() => setEditMessage(false)}
            />
          )}
          <Flex justify="between" align="center" width="100%">
            <CldUploadWidget
              options={{ maxFiles: 1 }}
              onUpload={handleUpload}
              uploadPreset="gsdh6mzb"
            >
              {({ open }) => (
                <IconButton
                  onClick={() => open()}
                  mr="5"
                  size="2"
                  variant="ghost"
                >
                  <RxImage size="20" />
                </IconButton>
              )}
            </CldUploadWidget>
            <form style={{ flex: 1 }} onSubmit={handleSubmit(onSubmit)}>
              <Flex align="center" justify="center" width="100%">
                <TextField.Root
                  size="3"
                  variant="surface"
                  style={{ width: "100%" }}
                >
                  <TextField.Input
                    id="message"
                    {...register("message", { required: true })}
                    placeholder="Type a message..."
                    required
                    style={{ wordBreak: "break-word" }}
                    autoComplete="off"
                  />
                </TextField.Root>
                <Button ml="4" size="2" type="submit">
                  <BiSolidSend />
                </Button>
              </Flex>
            </form>
          </Flex>
        </Box>
      )}
    </Box>
  );
}

export default ChatFooter;
