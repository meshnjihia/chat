import { signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import { HiChat } from 'react-icons/hi'
import { HiUsers, HiArrowLeftOnRectangle } from 'react-icons/hi2'
import useChat from './useChat'

const useRoutes = () => {
  const pathname = usePathname()
  const { conversationId } = useChat()

  const routes = useMemo(
    () => [
      {
        label: 'Chat',
        href: '/conversations',
        icon: HiChat,
        active: pathname === '/conversations' || !!conversationId,
      },
      {
        label: 'Users',
        href: '/users',
        icon: HiUsers,
        active: pathname === '/users',
      },
      {
        label: 'Logout',
        href: '#',
        onClick: () => signOut(),
        icon: HiArrowLeftOnRectangle,
      },
    ],
    [pathname, conversationId],
  )
  return routes
}

export default useRoutes
