import useActiveList from '@app/hooks/useActiveList'
import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type AvatarProps = {
  user?: User
}

const Avatar = ({ user }: AvatarProps) => {
  const { members } = useActiveList();
  const isActive = members.indexOf(user?.email!) !== -1

  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-6 w-6 md:h-8 md:w-8">
        <Image
          src={user?.image || '/images/avatar.ico'}
          alt="avatar"
          fill
        />
      </div>
      {isActive &&
        <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0  right-1 h-2 w-2 md:h-2 md:w-2' />
      }
    </div>
  )
}

export default Avatar
