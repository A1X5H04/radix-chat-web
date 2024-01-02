"use client";

import { RxEyeClosed, RxEyeOpen } from "react-icons/rx";
import { Box, Text, TextField, IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  id: string;
  type?: string;
  label: string;
  placeholder?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  required?: boolean;
  disabled: boolean;
}

function Input({
  id,
  type = "text",
  label,
  placeholder,
  register,
  errors,
  disabled,
  required = false,
}: InputProps) {
  const [showPassword, setShowPassword] = useState<Boolean>(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  return (
    <Box my="4">
      <Text as="label" htmlFor={id} trim="both" weight="bold" size="2">
        {label}
      </Text>
      <TextField.Root mt="2">
        <TextField.Input
          id={id}
          required={required}
          type={showPassword ? "name" : type}
          placeholder={placeholder}
          {...register(id, { required: true })}
          disabled={disabled}
        />
        {type === "password" && (
          <TextField.Slot>
            <IconButton
              type="button"
              onClick={toggleShowPassword}
              variant="ghost"
              style={{
                cursor: "pointer",
              }}
            >
              {showPassword ? <RxEyeClosed /> : <RxEyeOpen />}
            </IconButton>
          </TextField.Slot>
        )}
      </TextField.Root>
      {errors[id] && (
        <Text as="p" size="1" color="red" mt="1">
          This field is required
        </Text>
      )}
    </Box>
  );
}

export default Input;
