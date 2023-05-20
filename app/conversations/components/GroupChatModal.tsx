'use client'
import Button from '@app/components/Button'
import Modal from '@app/components/Modal'
import Input from '@app/components/inputs/Input'
import Select from '@app/components/inputs/Select'
import { User } from '@prisma/client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { MdOutlineCancel } from 'react-icons/md'
import { toast } from 'react-toastify'

type GroupChatModalProps = {
  isOpen?: boolean
  onClose: () => void
  users: User[]
}

const GroupChatModal = ({ isOpen, onClose, users }: GroupChatModalProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      members: [],
    },
  })

  const members = watch('members')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post(`/api/conversations`, {
        ...data,
        isGroup: true,
      })
      .then(() => {
        toast('Group chat created')
        router.refresh()
        onClose()
      })
      .catch(() => {
        setIsLoading(false)
        toast.error('Something went wrong')
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Create a group chat.
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              Create a chat with more than 2 people.
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                register={register}
                errors={errors}
                label="Group name"
                id="name"
                disabled={isLoading}
                required
              />
              <Select
                disabled={isLoading}
                label="Members"
                options={users.map((user) => ({
                  value: user.id,
                  label: user.name,
                }))}
                onChange={(value) => {
                  setValue('members', value, { shouldValidate: true })
                }}
                value={members}
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end items-center gap-x-6">
          <Button
            type="button"
            disabled={isLoading}
            onClick={onClose}
            secondary
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </Modal>
  )
}

export default GroupChatModal
