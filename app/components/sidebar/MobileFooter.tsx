'use client'
import useChat from '@app/hooks/useChat'
import useRoutes from '@app/hooks/useRoutes'

import MobileItem from './MobileItem'

type Props = {}

const MobileFooter = (props: Props) => {
  const routes = useRoutes()
  const { isOpen } = useChat()

  if (isOpen) {
    return null
  }
  return (
    <div className="fixed bottom-0 w-full justify-between z-40 flex items-center bg-white border-t-[1px] lg:hidden">
      {routes.map((route) => (
        <MobileItem
          key={route.label}
          href={route.href}
          label={route.label}
          icon={route.icon}
          active={route.active}
          onClick={route.onClick}
        />
      ))}
    </div>
  )
}

export default MobileFooter
