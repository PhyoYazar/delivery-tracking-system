import { Box, Button, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useRouter } from "next/router";
import React from "react";

export const Login = () => {
  const router = useRouter();

  return (
    <Box
      w={300}
      p={24}
      sx={(theme) => ({
        boxShadow: theme.shadows.md,
        borderRadius: theme.radius.md,
        border: `1px solid ${theme.colors.gray[3]}`,
      })}
    >
      <Stack>
        <TextInput placeholder="Your email" label="Email" />
        <PasswordInput placeholder="Password" label="Password" />

        <Button color="orange" onClick={() => void router.push("/")}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};
