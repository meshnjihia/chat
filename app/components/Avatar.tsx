import { User } from '@prisma/client'
import Image from 'next/image'
import React from 'react'

type AvatarProps = {
  user?: User
}

const Avatar = ({ user }: AvatarProps) => {
  return (
    <div className="relative">
      <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-12 md:w-12">
        <Image src={user?.image || '/images/avatar.ico'} fill alt="avatar" />
      </div>
      <span className='absolute block rounded-full bg-green-500 ring-2 ring-white top-0  right-0 h-2 w-2 md:h-3 md:w-3'/>
    </div>
  )
}

export default Avatar
