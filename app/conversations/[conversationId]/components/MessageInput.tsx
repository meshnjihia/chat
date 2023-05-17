'use client'

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form"

type MessageInputProps = {
  id: string
  type?: string
  required?: boolean
  errors: FieldErrors
  placeholder?: string
  register: UseFormRegister<FieldValues>
}

const MessageInput = ({id, type, required, errors, placeholder, register}: MessageInputProps) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        autoComplete={id}
        placeholder={placeholder}
        {...register(id, {
          required: required,
        })}
        className="w-full rounded-full border-none bg-neutral-100 px-4 py-2 focus:outline-none focus:border-none focus:ring-0 text-black font-medium"
      />
    </div>
  )
}

export default MessageInput