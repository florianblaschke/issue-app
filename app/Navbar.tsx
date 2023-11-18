"use client";

import Link from "next/link";
import { AiFillBug } from "react-icons/ai";
import { usePathname } from "next/navigation";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";
import Skeleton from "@/app/components/Skeleton";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="border-b mb-5 px-5 py-3">
      <Container>
        <Flex justify={"between"}>
          <Flex align={"center"} gap={"3"}>
            <Link href={"/"}>
              <AiFillBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <Skeleton width="3rem" />;
  if (status === "unauthenticated")
    return (
      <Link href={"/api/auth/signin"} className="nav-link">
        Login
      </Link>
    );
  if (status === "authenticated")
    return (
      <Box>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            <Avatar
              src={session.user?.image!}
              className="cursor-pointer"
              fallback="?"
              size="2"
              radius="full"
            />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Label>
              <Text size="2">{session.user!.email!}</Text>
            </DropdownMenu.Label>
            <DropdownMenu.Item>
              <Link href={"/api/auth/signout"}>Log out</Link>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Box>
    );
};

const NavLinks = () => {
  const currentPath = usePathname();

  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];
  return (
    <ul className="flex space-x-6">
      {links.map((entry) => (
        <li
          key={entry.href}
          className={classnames({
            "nav-link": true,
            "!text-zinc-900": entry.href === currentPath,
          })}
        >
          <Link href={entry.href}>{entry.label}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Navbar;
