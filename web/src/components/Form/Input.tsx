import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input(props: InputProps) {
  return (
    <input
      { ...props }
      className="w-full py-3 px-4 text-sm rounded bg-zinc-900 placeholder:text-zinc-500"
    />
  )
}