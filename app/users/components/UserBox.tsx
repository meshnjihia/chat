import Avatar from '@app/components/Avatar'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

type UserBoxProps = {
  data: User
}

const UserBox = ({ data }: UserBoxProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleClick = useCallback(() => {
    setIsLoading(true)

    axios
      .post('/api/conversations', {
        userId: data.id,
      })
      .then((data) => {
        router.push(`/conversations/${data.data.id}`)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [data, router])

  return <div
    onClick={handleClick}
    className='w-full relative flex items-center space-x-3 bg-neutral-100 p-3 rounded-lg hover:bg-white transition cursor-pointer'
  >
    <Avatar user={data} />
    <div className='min-w-0 flex-1'>
      <div className='focus:outline-none'>
        <div className='flex items-center justify-between mb-1'>
          <p className='text-sm font-medium text-gray-900'>
            {data.name}
          </p>
        </div>
      </div>
    </div>
    </div>
}

export default UserBox
