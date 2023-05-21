import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type AvatarGroupProps = {
  users?: User[]
}

const AvatarGroup = ({ users = [] }: AvatarGroupProps) => {
  const slicedUsers = Array.isArray(users) ? users.slice(0, 3) : []

  const positionMap = {
    0: 'top-0 left-[12px]',
    1: 'bottom-0',
    2: 'bottom-0 right-0',
  }

  return (
    <div className='relative h-11 w-11'>
      {slicedUsers.map((user, index) => (
        <div
          key={user.id}
          className={`absolute inline-block rounded-full overflow-hidden h-[21px] w-[21px] fhj ${positionMap[index as keyof typeof positionMap]}`}
        >
          <Image
            src={user?.image || '/images/avatar.ico'}
            alt='avatar'
            className='rounded-full'
            fill
          />
        </div>
      ))}
    </div>
  )
}

export default AvatarGroup
