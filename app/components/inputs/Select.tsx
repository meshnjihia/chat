'use client'
import React from 'react'
import ReactSelect from 'react-select'

type SelectProps = {
  disabled?: boolean
  label: string
  value?: Record<string, any>
  onChange: (value: Record<string, any>) => void
  options: Record<string, any>[]

}

const Select = ({ disabled, label, value, onChange, options }: SelectProps) => {
  return (
    <div className='z-[100]'>
      <label
        htmlFor=""
        className='block text-sm font-medium text-gray-900 leading-7'
      >
        {label}
      </label>
      <div className='mt-2'>
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          options={options}
          isMulti
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
          }}
          classNames={{
            control: () => 'text-sm',
          }}
        />
      </div>
    </div>
  )
}

export default Select