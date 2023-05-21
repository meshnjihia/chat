'use client'
import React, { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'
import { PuffLoader } from 'react-spinners'



type LoadingModalProps = {
    

}

const LoadingModal = ({  }: LoadingModalProps) => {
  return (
    <Transition.Root show as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={()=>{}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-fuchsia-100 bg-opacity-50 transition-opacity" />
        </Transition.Child>
        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-full p-4 text-center'>
            <Dialog.Panel>
              <PuffLoader size={100} color="#c936d6" />
            </Dialog.Panel>
          </div>
        </div>
        </Dialog>
      </Transition.Root>
  )
}

export default LoadingModal