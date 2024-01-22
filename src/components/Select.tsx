"use client";
import { Box, Text } from "@radix-ui/themes";
import React from "react";
import ReactSelect from "react-select";
import { useStyles } from "tss-react";

interface SelectProps {
  label: string;
  value?: Record<string, any>;
  onChange: (value: Record<string, any>) => void;
  options: Record<string, any>[];
  disabled?: boolean;
}

function Select({ label, value, onChange, options, disabled }: SelectProps) {
  const { css } = useStyles();
  return (
    <Box>
      <Text as="label" trim="both" weight="bold" size="2">
        {label}
      </Text>
      <ReactSelect
        isDisabled={disabled}
        value={value}
        onChange={onChange}
        isMulti
        options={options}
        menuPortalTarget={document.body}
        styles={{
          menuPortal: (base) => ({ ...base, zIndex: 999 }),
        }}
        // classNames={{
        //   container: () =>
        //     css({
        //       marginTop: 4,
        //       border: "1px solid var(--gray-7)",
        //       backgroundColor: "var(--gray-1)",
        //       borderRadius: "var(--radius-3)",
        //       height: 35,
        //       fontSize: 14,
        //       padding: "0 10px",
        //       paddingBottom: 5,
        //     }),
        //   control: () =>
        //     css({
        //       border: "none",
        //       boxShadow: "none",
        //     }),
        //   valueContainer: () =>
        //     css({ padding: 0, backgroundColor: "var(--color-background)"  }),

        //   dropdownIndicator: () => css({ fontSize: 14 }),
        // }}
        // unstyled
      />
    </Box>
  );
}

export default Select;
