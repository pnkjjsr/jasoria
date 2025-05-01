"use client";
import React, { useState } from "react";
import useOnlineStatus from "@repo/shared/hooks/onlineStatus";
import ThemeProvider from "@repo/shared/contexts/themeProvider";
import NotificationBar from "@repo/shared/components/notificationbar";

import "./style.css";

export default function Play() {
  const isOnline = useOnlineStatus();

  const person = [
    {
      name: "Pankaj",
      href: "/pankaj",
      email: "pnkj_jsr@yahoo.co.in",
      role: "Self",
      imageUrl:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "",
      lastSeenDateTime: "Last seen 3h ago",
    },
    {
      name: "Pawan",
      href: "/pawan",
      email: "pawanjasoria@gmail.com",
      role: "Brother",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "3h ago",
    },
    {
      name: "Parveen",
      href: "/parveen",
      email: "parveenjasoria@gmail.com",
      role: "Sister",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "4h ago",
    },
    {
      name: "Rajesh",
      href: "/rajesh",
      email: "rajeshdevijasoria@gmail.com",
      role: "Mother",
      imageUrl:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "3h ago",
      lastSeenDateTime: "3h ago",
    },
    {
      name: "Satish",
      href: "/satish",
      email: "satishkumar@gmail.com",
      role: "Father",
      imageUrl:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      lastSeen: "",
      lastSeenDateTime: "Last seen 3h ago",
    },
  ];

  const renderPerson = () => {
    const personItem = person.map((person) => (
      <li key={person.email} className="flex justify-between gap-x-6 py-5">
        <div className="flex min-w-0 gap-x-4">
          {person.imageUrl}

          <div className="min-w-0 flex-auto">
            <p className="text-sm/6 font-semibold text-gray-900">
              {person.name}
            </p>
            <p className="mt-1 truncate text-xs/5 text-gray-500">
              {person.email}
            </p>
          </div>
        </div>
        <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm/6 text-gray-900">{person.role}</p>
          {person.lastSeen ? (
            <p className="mt-1 text-xs/5 text-gray-500">
              Last seen{" "}
              <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
            </p>
          ) : (
            <div className="mt-1 flex items-center gap-x-1.5">
              <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                <div className="size-1.5 rounded-full bg-emerald-500" />
              </div>
              <p className="text-xs/5 text-gray-500">Online</p>
            </div>
          )}
        </div>
      </li>
    ));
    return (
      <ul role="list" className="w-max divide-y divide-gray-100 ">
        {personItem}
      </ul>
    );
  };

  const [toggle, setToggle] = useState(true);
  const handleToggle = () => setToggle(!toggle);

  return (
    <ThemeProvider>
      <div className="play">
        <div className="relative isolate flex items-center gap-x-6 overflow-hidden bg-green-400 px-6 py-2.5 sm:px-3.5 sm:before:flex-1">
          {/* Online status hook */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="text-sm/6 text-green-800">
              <strong className="font-semibold">
                {isOnline ? "We are Online!" : "Reconnecting..."}
              </strong>
              <svg
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="mx-2 inline size-0.5 fill-current"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
            </p>
          </div>

          <NotificationBar />

          <div className="flex flex-1 justify-end">
            <button
              type="button"
              className="-m-3 p-3 focus-visible:outline-offset-[-4px]"
            >
              <span className="sr-only">Dismiss</span>
            </button>
          </div>
        </div>

        <section className="p-flex">
          {renderPerson()}

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4">
            <div
              onClick={handleToggle}
              className={`cursor-pointer rounded-lg shadow p-4 text-center hover:bg-blue-50 transition ${
                toggle ? "bg-green-500 hover:bg-green-200" : "bg-white"
              }`}
            >
              I&apos;m {toggle ? "Online" : "offline"}
            </div>
          </div>
        </section>
        <section className="p-grid">
          <div className="item-one">item 1</div>
          <div className="item-two">item 2</div>
          <div className="item-three">item 3</div>
        </section>
      </div>
    </ThemeProvider>
  );
}
