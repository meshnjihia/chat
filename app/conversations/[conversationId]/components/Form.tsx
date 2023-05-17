'use client'

import useChat from "@app/hooks/useChat"
import axios from "axios";
import { FieldValue, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { HiPhoto } from "react-icons/hi2";
import MessageInput from "./MessageInput";
import { HiPaperAirplane } from "react-icons/hi2";

type Props = {}

const Form = (props: Props) => {
  const { conversationId } = useChat();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FieldValues>({
    defaultValues: {
      message:'',
    }
  })

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setValue('message', '', { shouldValidate: true })
    axios.post(`/api/messages`, {
      ...data,
      conversationId: conversationId
    })
  }
  return (
    <div className="p-4 bg-white border-t flex items-center gap-2 lg:gap-4 w-full">
      <HiPhoto size={30} className="text-fuchsia-500" />
      <form onSubmit={handleSubmit(onSubmit)} className="flex items-center gap-2 lg:gap-4 w-full">
        <MessageInput
          id='message'
          register={register}
          required
          placeholder="Write your message..."
          errors={errors}
        />
        <button type="submit" className="rounded-full bg-fuchsia-500 p-2 hover:bg-fuchsia-600 transition text-white ">
          <HiPaperAirplane size={18}/>
        </button>
      </form>
    </div>
  )
}

export default Form