"use client";
import React, { useState } from "react";

export default function useCounter(initialValue: number = 0) {
  const [count, setCount] = React.useState(initialValue);
  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset,
  };
}
