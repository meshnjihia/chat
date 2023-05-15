'use client'
import React from 'react'

const EmptyState = () => {
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex justify-center items-center bg-gray-200'>
      <div className='flex flex-col items-center text-center'>
        <h3 className='mt-3 text-2xl font-semibold text-gray-900'>
          Select conversation or start new chat
        </h3>
      </div>
    </div>
  )
}

export default EmptyState