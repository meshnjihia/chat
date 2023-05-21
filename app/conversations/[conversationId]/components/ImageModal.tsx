'use client'
import Modal from '@app/components/Modal'
import Image from 'next/image'
import React from 'react'

type ImageModalProps = {
    src?: string | null
    isOpen?: boolean
    onClose: () => void
}

const ImageModal = ({ src, isOpen, onClose }: ImageModalProps) => {
  if (!src) {
    return null
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='w-80 h-80 overflow-hidden'>
        <Image
          src={src}
          alt="Image modal"
          fill
          className='object-cover cursor-pointer'
        />
      </div>
    </Modal>
  )
}

export default ImageModal