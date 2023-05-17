'use client'
import useOtherUser from '@app/hooks/useOtherUser'
import { HiChevronLeft } from 'react-icons/hi'
import { Conversation, User } from '@prisma/client'
import clsx from 'clsx'
import Link from 'next/link'
import React, { useMemo } from 'react'
import Avatar from '@app/components/Avatar'
import { HiEllipsisHorizontal } from 'react-icons/hi2'

type HeaderProps = {
  conversation: Conversation & {
    users: User[]
  }
}

const Header = ({ conversation }: HeaderProps) => {

  const otherUser = useOtherUser(conversation)

  const statusText = useMemo(() => {
    if (conversation.isGroup) {
      return `${conversation.users.length} members`
    }

    return 'Active'
  }, [conversation])

  return (
    <div className='flex bg-white w-full border-b-[1px] sm:px-4 py-3 px-3 lg:px-6 justify-between items-center shadow-sm'>
      <div className='flex gap-3 items-center'>
        <Link
          href={`/conversations`}
          className={'lg:hidden block text-fuchsia-500 hover:text-fuchsia-600 transition cursor-pointer'}
        >
          <HiChevronLeft size={32} />
        </Link>
        <Avatar user={otherUser} />
        <div className='flex flex-col'>
          <div>
            {conversation.name || otherUser.name}
          </div>
          <div className='text-sm text-stone-500 font-light'>
            {statusText}
          </div>
        </div>
      </div>
      <HiEllipsisHorizontal
        size={32}
        onClick={() => { }}
        className='text-fuchsia-500 hover:text-fuchsia-600 cursor-pointer transition'
      />
    </div>
  )
}

export default Header