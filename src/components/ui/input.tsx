import * as React from "react";

import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex 
          h-12 
          w-full  
          px-3 
          py-2 
          rounded
          font-light

          file:border-0 
          file:bg-transparent 
          file:text-sm 
          file:font-medium

          bg-white 
          dark:bg-dark-blue

          placeholder:text-neutral-500
          dark:placeholder:text-neutral-400

          focus-visible:ring-offset-2
          focus-visible:outline-none 
          focus-visible:ring-2

          ring-offset-very-light-gray
          dark:ring-offset-very-dark-blue-bg

          focus-visible:ring-dark-gray 
          dark:focus-visible:ring-white

          disabled:cursor-not-allowed 
          disabled:opacity-50`,
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
