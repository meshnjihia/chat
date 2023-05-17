'use client'
import EmptyState from '@app/components/EmptyState'
import useChat from '@app/hooks/useChat'
import clsx from 'clsx'

const Home = () => {
  const { isOpen } = useChat()
  return (
    <div
      className={clsx('lg:pl-80 h-full lg:block', isOpen ? 'block' : 'hidden')}
    >
      <EmptyState />
    </div>
  )
}

export default Home
