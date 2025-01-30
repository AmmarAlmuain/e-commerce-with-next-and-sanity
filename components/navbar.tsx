"use client";

import {
  ChevronDown,
  CircleHelp,
  Facebook,
  Github,
  Heart,
  Instagram,
  MoveRight,
  ShoppingCart,
  Twitter,
  Youtube,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { P, Small } from "./ui/typography";
import Link from "next/link";
import React, { use, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "./ui/separator";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/auth") ? null : (
        <header>
          <nav className="flex flex-col">
            <Widget />
            <TopNav />
            <BottomNav />
          </nav>
        </header>
      )}
    </>
  );
}

function Widget() {
  return (
    <>
      <div className="w-full flex justify-between items-center h-16 border-b px-8">
        <P>
          🩵ིྀ Your email address isn't verified yet. Click the button to verify
          it.
        </P>
        <Button>
          Verify now <MoveRight />
        </Button>
      </div>
    </>
  );
}
function TopNav() {
  return (
    <>
      <div className="bg-muted w-full flex justify-between items-center h-9 border-b px-8">
        <Small>Welcome to our online eCommerce store.</Small>
        <div className="flex gap-x-2">
          <Small className="flex justify-center items-center">Follow us:</Small>
          <div className="flex justify-center items-center gap-x-2">
            <Link href={""}>
              <Facebook
                size={16}
                className="flex justify-center items-center"
              />
            </Link>
            <Link href={""}>
              <Instagram
                size={16}
                className="flex justify-center items-center"
              />
            </Link>
            <Link href={""}>
              <Twitter size={16} className="flex justify-center items-center" />
            </Link>
            <Link href={""}>
              <Youtube size={16} className="flex justify-center items-center" />
            </Link>
            <Link href={""}>
              <Github size={16} className="flex justify-center items-center" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function BottomNav() {
  const [menu_opened, set_menu_opened] = useState(false);
  const [categories_opened, set_categories_opened] = useState(false);
  const [account_opened, set_aaccount_opened] = useState(false);
  return (
    <>
      <div className="w-full justify-between items-center flex h-16 border-b px-8">
        <div>
          <ul className="items-center gap-x-4 h-16 flex">
            <li className="h-full relative flex justify-center items-center">
              <span
                className="text-sm flex gap-x-2 group font-medium leading-none cursor-pointer"
                onClick={() => {
                  if (account_opened === true) {
                    set_aaccount_opened(!account_opened);
                  }
                  set_menu_opened(!menu_opened);
                }}
              >
                <span className="group-hover:text-primary transition-all duration-300">
                  Menu
                </span>
                <ChevronDown
                  size={16}
                  className={`${menu_opened ? "rotate-180" : ""} group-hover:text-primary transition-all duration-300`}
                />
              </span>
              <div
                className={`px-4 w-96 flex-col ${menu_opened ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-300 bg-muted translate-y-16 absolute top-0 left-0 flex justify-center items-start`}
              >
                <span
                  className="text-sm py-4 flex justify-center items-center group gap-x-2 font-medium leading-none cursor-pointer"
                  onClick={() => {
                    set_categories_opened(!categories_opened);
                  }}
                >
                  <span className="group-hover:text-primary transition-all duration-300">
                    Categories
                  </span>
                  <ChevronDown
                    size={16}
                    className={`${categories_opened ? "rotate-180" : ""} group-hover:text-primary transition-all duration-300`}
                  />
                </span>
                <div
                  className={`transition-all h-full duration-300 ${categories_opened ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"} overflow-hidden`}
                >
                  <div className="px-4">
                    <Small className="cursor-pointer w-fit hover:text-primary transition-all duration-300">
                      Apple
                    </Small>
                  </div>
                  <div className="px-4 pt-4">
                    <Small className="cursor-pointer hover:text-primary transition-all duration-300">
                      Samsung
                    </Small>
                  </div>
                  <div className="px-4 pt-4">
                    <Small className="cursor-pointer hover:text-primary transition-all duration-300">
                      Oppo
                    </Small>
                  </div>
                  <div className="px-4 pt-4">
                    <Small className="cursor-pointer hover:text-primary transition-all duration-300">
                      Xiaomi
                    </Small>
                  </div>
                  <div className="px-4 py-4">
                    <Small className="cursor-pointer hover:text-primary transition-all duration-300">
                      Vivo
                    </Small>
                  </div>
                </div>
                <div>
                  <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                    Our Story
                  </Small>
                </div>
                <div className="pt-4">
                  <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                    Blog
                  </Small>
                </div>
                <div className="py-4">
                  <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                    Contact Us
                  </Small>
                </div>
              </div>
            </li>
            <li>
              <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                Products
              </Small>
            </li>
            <li className="h-full relative flex justify-center items-center">
              <span
                className="text-sm flex gap-x-2 group font-medium leading-none cursor-pointer"
                onClick={() => {
                  if (menu_opened === true) {
                    set_menu_opened(!menu_opened);
                  }
                  set_aaccount_opened(!account_opened);
                }}
              >
                <span className="group-hover:text-primary transition-all duration-300">
                  Account
                </span>
                <ChevronDown
                  size={16}
                  className={`${account_opened ? "rotate-180" : ""} group-hover:text-primary transition-all duration-300`}
                />
              </span>
              <div
                className={`px-4 w-96 flex-col ${account_opened ? "visible opacity-100" : "invisible opacity-0"} transition-all duration-300 bg-muted translate-y-16 absolute top-0 left-0 flex justify-center items-start`}
              >
                <div className="pt-4 gap-y-2 flex flex-col">
                  <Button>
                    <Link href={"/auth/sign-in"}>Sign In</Link>
                  </Button>
                  <div className="text-xs">
                    Don't have an account?{" "}
                    <Link className="underline" href={"/auth/sign-up"}>
                      Sign up
                    </Link>
                  </div>
                  <Separator className="my-2" />
                </div>
                <div className="pt-2">
                  <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                    Profile
                  </Small>
                </div>
                <div className="pt-4">
                  <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                    Orders
                  </Small>
                </div>
                <div className="py-4">
                  <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                    Your list
                  </Small>
                </div>
              </div>
            </li>
            <li>
              <Small className="hover:text-primary transition-all duration-300 cursor-pointer">
                Contact Us
              </Small>
            </li>
          </ul>
        </div>
        <div className="h-full w-full max-w-lg flex justify-center items-center">
          <Input
            className="w-full"
            type="text"
            placeholder="🔍 Find your perfect phone, awesome accessories, and more!"
          />
        </div>
        <div className="flex gap-x-4">
          <div className="flex gap-x-4 items-center">
            <ShoppingCart size={20} />
            <Heart size={20} />
          </div>
          <Button>
            Who we are <CircleHelp />
          </Button>
        </div>
      </div>
    </>
  );
}
