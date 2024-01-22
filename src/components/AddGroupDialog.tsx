"use client";

import { Button, Dialog, Flex } from "@radix-ui/themes";
import React from "react";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import Input from "./Input";
import Select from "./Select";
import { User } from "@prisma/client";

function AddGroupDialog({
  children,
  users,
}: {
  children: React.ReactNode;
  users: User[];
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      members: [],
    },
  });

  const members = watch("members");

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/conversation", {
        ...data,
        isGroup: true,
      })
      .then(() => router.refresh())
      .catch(() => alert("Failed to create Group"))
      .finally(() => setIsLoading(false));
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger>{children}</Dialog.Trigger>
      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Create a group</Dialog.Title>
        <Dialog.Description size="2" mb="4" mt="-1">
          Chat with multiple people at once.
        </Dialog.Description>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <Input
              id="name"
              label="Group Name"
              register={register}
              disabled={isLoading}
              required
              errors={errors}
            />
            <Select
              disabled={isLoading}
              label="Group Members"
              options={users.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
              onChange={(value) =>
                setValue("members", value, { shouldValidate: true })
              }
              value={members}
            />
          </Flex>
          <Flex mt="4" justify="end" gap="2">
            <Dialog.Close>
              <Button type="button" variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button type="submit">Create Group</Button>
            </Dialog.Close>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default AddGroupDialog;
