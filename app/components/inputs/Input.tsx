'use client'
import clsx from "clsx"
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

type InputProps = {
  label: string
  id: string
  type?: string
  required?: boolean
  register: UseFormRegister<FieldValues>
  errors: FieldErrors
  disabled?: boolean

}

const Input = ({label, id, type, required, register, errors, disabled}: InputProps) => {
  return (
    <div>
      <label
        className="block text-sm font-medium leading-6 text-gray-900"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="mt2">
        <input
          id={id}
          type={type}
          autoComplete={id}
          placeholder={id}
          disabled={disabled}
          {...register(id, { required })}
          className={clsx(`
          form-input
          block
          w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 placeholder:capitalize focus:ring-2 focus:ring-inset focus:ring-fuchsia-600 sm:text-sm sm:leading-6
          `, errors[id] && 'focus:ring-offset-rose-600', disabled && 'opacity-50 cursor-default')}
        />
      </div>
    </div>
  )
}

export default Input