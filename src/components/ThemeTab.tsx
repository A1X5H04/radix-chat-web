"use client";

import React from "react";
import {
  accentColors,
  backgroundColors,
  radiusValues,
  scalingValues,
} from "@/data/radix-theme";
import { Box, Container, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import {
  RxCheck,
  RxDesktop,
  RxMoon,
  RxShadow,
  RxShadowOuter,
  RxSun,
} from "react-icons/rx";
import { tss, useStyles } from "tss-react";

const themeTabStyles = tss.create({
  colorInput: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },
  colorSwatch: {
    position: "relative",
    width: 28,
    height: 28,
    borderRadius: "max(var(--radius-3), var(--radius-full))",
    "& label": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      cursor: "pointer",
      borderRadius: "inherit",
    },
    "& label span": {
      width: "100%",
      height: "100%",
      display: "grid",
      placeItems: "center",
      backgroundColor: "transparent",
      alignItems: "center",
      transition: "backgroundColor 0.4s ease",
    },
    "& label .iconChecked": {
      color: "white",
      opacity: 0,
      transition: "opacity 0.4s ease",
      // Add your own styles for the check mark here
    },
    "& input:checked + label": {
      border: "2px solid var(--gray-6)",
    },
    "& input:checked + label span": {
      backgroundColor: "var(--color-overlay)",
    },
    "& input:checked + label .iconChecked": {
      opacity: 1,
    },
  },

  btnInput: {
    position: "absolute",
    opacity: 0,
    width: 0,
    height: 0,
  },

  btnSwatch: {
    position: "relative",
    borderRadius: "max(var(--radius-3), var(--radius-full))",
    "& label": {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      backgroundColor: "red",
      cursor: "pointer",
      borderRadius: "inherit",
    },
    "& input:checked + label": {
      border: "2px solid var(--gray-6)",
    },
    "& input:checked + label span": {
      backgroundColor: "var(--color-overlay)",
    },
    "& input:checked + label .iconChecked": {
      opacity: 1,
    },
  },
});

function ThemeTab() {
  const { classes } = themeTabStyles();
  const { css } = useStyles();
  return (
    <Container my="2">
      <Box mb="7">
        <Heading size="2">Accent Colors</Heading>
        <Grid
          gap="4"
          mt="4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(25px, 1fr))",
          }}
        >
          {accentColors.map((color) => (
            <Box className={classes.colorSwatch} key={color.value}>
              <input
                className={classes.colorInput}
                type="radio"
                id={color.value}
                name="color"
                value="color-1"
                checked
              />
              <label
                style={{
                  backgroundColor: color.color,
                  width: "100%",
                  height: "100%",
                }}
                htmlFor={color.value}
              >
                <span>
                  <RxCheck className="iconChecked" />
                </span>
              </label>
            </Box>
          ))}
        </Grid>
      </Box>
      <Box mb="7">
        <Heading size="2">Background Colors</Heading>
        <Grid
          gap="4"
          mt="4"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(30px, 1fr))",
          }}
        >
          {backgroundColors.map((color) => (
            <Box className={classes.colorSwatch} key={color.value}>
              <input
                className={classes.colorInput}
                type="radio"
                id={color.value}
                name="color"
                value="color-1"
                checked
              />
              <label
                style={{
                  backgroundColor: color.color,
                  width: "100%",
                  height: "100%",
                }}
                htmlFor={color.value}
              >
                <span>
                  <RxCheck className="iconChecked" />
                </span>
              </label>
            </Box>
          ))}
        </Grid>
      </Box>
      <Box mb="7">
        <Heading size="2">Appearance</Heading>
        <Flex mt="4" gap="4">
          <label>
            <input
              className={classes.btnInput}
              type="radio"
              id="auto"
              name="appearance"
              value="auto"
              checked
            />
            <Flex
              className={classes.btnSwatch}
              align="center"
              gap="2"
              px="5"
              py="3"
            >
              <RxDesktop />
              <Text size="2" weight="medium">
                Auto
              </Text>
            </Flex>
          </label>
          <Flex
            align="center"
            gap="2"
            px="5"
            py="2"
            style={{
              border: "1px solid var(--gray-3)",
            }}
          >
            <RxSun />
            <Text size="2" weight="medium">
              Light
            </Text>
          </Flex>
          <Flex
            align="center"
            gap="2"
            px="5"
            py="2"
            style={{
              border: "1px solid var(--gray-3)",
            }}
          >
            <RxMoon />
            <Text size="2" weight="medium">
              Dark
            </Text>
          </Flex>
        </Flex>
      </Box>
      <Box mb="7">
        <Heading size="2">Radius</Heading>
        <Flex mt="4" gap="4">
          {radiusValues.map((radius) => (
            <Box
              style={{
                textAlign: "center",
                textTransform: "capitalize",
              }}
              key={radius}
            >
              <Box
                p="3"
                style={{
                  border: "1px solid var(--gray-3)",
                }}
              >
                <Box
                  style={{
                    backgroundColor: "var(--accent-3)",
                    width: 30,
                    height: 30,
                    borderTop: "3px solid var(--accent-6)",
                    borderLeft: "3px solid var(--accent-6)",
                  }}
                />
              </Box>
              <Text size="1">{radius}</Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box mb="7">
        <Heading size="2">Scaling</Heading>
        <Flex mt="4" gap="4">
          {scalingValues.map((scaling) => (
            <Box
              key={scaling}
              px="3"
              p="1"
              style={{
                border: "1px solid var(--gray-3)",
              }}
            >
              <Text weight="medium" size="2">
                {scaling}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box>
        <Heading size="2">Panel Background</Heading>
        <Flex mt="4" gap="4">
          <label htmlFor="solid">
            <input
              id="solid"
              type="radio"
              name="panel_background"
              value="solid"
              className={css({
                display: "inline-block",
                position: "absolute",
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                height: 1,
                width: 1,
                margin: -1,
                padding: 0,
                border: 0,
                "&:checked ~ .rt-Flex": {
                  border: "2px solid var(--gray-11)",
                },
              })}
            />
            <Flex
              align="center"
              gap="2"
              px="5"
              py="2"
              style={{
                border: "1px solid var(--gray-3)",
                borderRadius: "max(var(--radius-3), var(--radius-full)))",
              }}
            >
              <RxShadowOuter />
              <Text size="2" weight="medium">
                Solid
              </Text>
            </Flex>
          </label>

          <label htmlFor="transculent">
            <input
              id="transculent"
              type="radio"
              name="panel_background"
              value="transculent"
              checked
              className={css({
                display: "inline-block",
                position: "absolute",
                overflow: "hidden",
                clip: "rect(0 0 0 0)",
                height: 1,
                width: 1,
                margin: -1,
                padding: 0,
                border: 0,
                "&:checked ~ .rt-Flex": {
                  border: "2px solid var(--gray-11)",
                },
              })}
            />
            <Flex
              align="center"
              gap="2"
              px="5"
              py="2"
              style={{
                border: "1px solid var(--gray-3)",
                borderRadius: "max(var(--radius-3), var(--radius-full)))",
              }}
            >
              <RxShadow />
              <Text size="2" weight="medium">
                Transculent
              </Text>
            </Flex>
          </label>
        </Flex>
      </Box>
    </Container>
  );
}

export default ThemeTab;
