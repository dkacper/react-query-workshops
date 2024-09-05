import { Anchor, Center, Stack, Text, Title } from "@mantine/core";

export default function Home() {
  return (
    <Center mih="100vh">
      <Stack align="center">
        <Title order={2}>Welcome to the TanStack Query!</Title>
        <Anchor
          href="https://tanstack.com/query/latest/docs/framework/react/overview"
          target="_blank"
        >
          React Query docs
        </Anchor>
      </Stack>
    </Center>
  );
}
