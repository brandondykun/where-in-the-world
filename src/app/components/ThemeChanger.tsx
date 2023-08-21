"use client";

import React, { useEffect, useState } from "react";
import { BsMoonFill, BsMoon } from "react-icons/bs";
import { useTheme } from "next-themes";

const Themechanger = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const light = theme === "light";
  return (
    <button
      className=" dark:text-white text-very-dark-blue-text flex items-center gap-2"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {light ? <BsMoon size={12} /> : <BsMoonFill size={12} />}
      <div>Dark Mode</div>
    </button>
  );
};

export default Themechanger;
