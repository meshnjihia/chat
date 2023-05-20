'use client'
import React, { useState } from 'react'
import Modal from '../Modal'
import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import axios from 'axios'
import { toast } from 'react-toastify'
import Input from '../inputs/Input'
import Image from 'next/image'
import { CldUploadButton } from 'next-cloudinary'
import Button from '../Button'

type SettingModalProps = {
  isOpen?: boolean
  onClose: () => void
  currentUser: User
}

const SettingModal = ({ isOpen, onClose, currentUser }: SettingModalProps) => {
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
      name: currentUser?.name,
      image: currentUser?.image,
    },
  })

  const image = watch('image')

  const handleUpload = (result: any) => {
    setValue('image', result?.info?.secure_url, {
      shouldValidate: true,
    })
  }

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    axios
      .post('api/settings', data)
      .then(() => {
        // toast('Settings updated successfully')
        onClose()
        router.refresh()
      })
      .catch(() => {
        toast.error('Failed to update settings')
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h3 className="text-base font-semi-bold leading-7 text-gray-900">
              Profile
            </h3>
            <p className="mt-1 text-sm text-gray-500 leading-6">
              Edit your public information
            </p>
            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                label="Name"
                id="name"
                errors={errors}
                register={register}
                required
              />
              <div>
                <label
                  htmlFor="image"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    src={image || currentUser?.image || '/images/avatar.ico'}
                    width={48}
                    height={48}
                    alt="profile"
                    className="rounded-full"
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="vfvlwbvr"
                  >
                    <Button
                      type='button'
                      disabled={isLoading}
                      secondary
                    >
                      Change
                    </Button>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>
          <div className='mt-6 flex justify-end items-center gap-x-6'>
            <Button
              disabled={isLoading}
              secondary
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              type='submit'
              onClick={onClose}
            >
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}

export default SettingModal
