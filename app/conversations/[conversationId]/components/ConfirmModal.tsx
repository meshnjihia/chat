'use client'
import {  Dialog } from '@headlessui/react'
import Modal from '@app/components/Modal'
import useChat from '@app/hooks/useChat'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { toast } from 'react-toastify'
import { FiAlertTriangle } from 'react-icons/fi'
import Button from '@app/components/Button'

type ConfirmModalProps = {
  isOpen?: boolean
  onClose: () => void
}

const ConfirmModal = ({ isOpen, onClose }: ConfirmModalProps) => {
  const router = useRouter()
  const { conversationId } = useChat()
  const [isLoading, setIsLoading] = useState(false)

  const onDelete = useCallback(() => {
    setIsLoading(true)

    axios
      .delete(`/api/conversations/${conversationId}`)
      .then(() => {
        toast('Conversation deleted successfully')
        onClose()
        router.push('/conversations')
        router.refresh()
      })
      .catch(() => {
        toast.error('Failed to delete conversation')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [conversationId, router, onClose])
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-start">
        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>
        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
          <Dialog.Title
            as="h3"
            className="text-base font-semibold leading-6 text-gray-900"
          >
            Delete conversation
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-sm text-gray-400">
              Are you sure you want to delete this conversation? this action
              cannot be undone.
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <Button
          onClick={onDelete}
          disabled={isLoading}
          danger
        >
          Delete
        </Button>
        <Button
          onClick={onClose}
          disabled={isLoading}
          secondary
        >
          Cancel
        </Button>
      </div>
    </Modal>
  )
}

export default ConfirmModal
