'use client'
import clsx from 'clsx'
import Link from 'next/link'
import React from 'react'

type MobileItemProps = {
  href: string
  label: string
  icon: any
  active?: boolean
  onClick?: () => void
}

const MobileItem = ({
  href,
  label,
  icon: Icon,
  active,
  onClick,
}: MobileItemProps) => {
  const handleClick = () => {
    if (onClick) {
      return onClick()
    }
  }
  return (
    <Link
      href={href}
      onClick={handleClick}
      className={clsx(
        `group flex gap-x-3 p-4 text-sm leading-6 text-gray-500 hover:text-black hover:bg-fuchsia-100`,
        active && 'bg-fuchsia-100 text-black',
      )}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <span className="sr-only">{label}</span>
    </Link>
  )
}

export default MobileItem
