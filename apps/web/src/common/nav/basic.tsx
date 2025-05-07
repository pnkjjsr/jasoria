"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Buy",
    href: "/docs/primitives/alert-dialog",
    description: "Find your dream home.",
  },
  {
    title: "Sell",
    href: "/docs/primitives/progress",
    description: "List your property and reach buyers fast.",
  },
  {
    title: "Rent",
    href: "/docs/primitives/hover-card",
    description: "Explore rental homes and apartments.",
  },
  {
    title: "Agents",
    href: "/docs/primitives/scroll-area",
    description: "Connect with experienced local agents.",
  },
  {
    title: "Neighborhoods",
    href: "/docs/primitives/tabs",
    description: "Discover top areas to live in.",
  },
  {
    title: "Mortgage",
    href: "/docs/primitives/tooltip",
    description: "Tools and rates to finance.",
  },
];

export default function NavigationMenuDemo() {
  return (
    <nav className="lg:w-1/2 md:w-3/4 mx-2 md:mx-auto bg-background p-4 mt-4 border rounded-4xl shadow-lg transition-all duration-300 ease-in-out hover:shadow-2xl hover:scale-105">
      <NavigationMenu className="w-auto mx-auto">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Jobs</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        jobs.jasoria.io
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        A jobs platform like never before — easy to use,
                        powerfully enhanced for results and beautifully simplest
                        designed.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/docs" title="Find Jobs">
                  Explore thousands of job listings tailored to your skills.
                </ListItem>
                <ListItem href="/docs/installation" title="Post a Job">
                  Hire smarter—connect with qualified candidates instantly.
                </ListItem>
                <ListItem
                  href="/docs/primitives/typography"
                  title="Find Candidates"
                >
                  Discover qualified candidates ready to make an impact.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Real Estate</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/docs" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Food Delivery
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
