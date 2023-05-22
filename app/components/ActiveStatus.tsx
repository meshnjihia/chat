'use client'
import useActiveChannel from '@app/hooks/useActiveChannel'
import React from 'react'

type ActiveStatusProps = {}

const ActiveStatus = (props: ActiveStatusProps) => {
  useActiveChannel();
  
  return (
    null
  )
}

export default ActiveStatus