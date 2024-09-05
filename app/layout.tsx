import "@mantine/core/styles.css";

import {
  Anchor,
  AppShell,
  AppShellMain,
  AppShellNavbar,
  ColorSchemeScript,
  Container,
  Stack,
  Title,
} from "@mantine/core";
import Link from "next/link";
import { Providers } from "./Providers";

export const metadata = {
  title: "My Mantine app",
  description: "I have followed setup instructions carefully",
};

const nav = [
  { label: "1. useQuery", href: "/use-query" },
  { label: "2. useMutation", href: "/use-mutation" },
  { label: "3. Infinite Scroll", href: "/infinite-scroll" },
  { label: "4. SSR prefetch", href: "/ssr-prefetch" },
];

export default function RootLayout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <Providers>
          <AppShell
            navbar={{
              width: 300,
              collapsed: { desktop: false, mobile: true },
              breakpoint: "xs",
            }}
          >
            <AppShellNavbar>
              <Stack p="lg">
                <Title>React Query Workshops</Title>
                {nav.map(({ label, href }) => (
                  <Anchor key={href} component={Link} href={href}>
                    {label}
                  </Anchor>
                ))}
              </Stack>
            </AppShellNavbar>
            <AppShellMain>
              <Container p="xl">{children}</Container>
            </AppShellMain>
          </AppShell>
        </Providers>
      </body>
    </html>
  );
}
