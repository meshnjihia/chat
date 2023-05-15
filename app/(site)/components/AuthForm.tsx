'use client'
import axios from 'axios'
import { toast } from 'react-toastify'
import { signIn, useSession } from 'next-auth/react'

import { BsGithub, BsGoogle } from 'react-icons/bs'

import Button from '@app/components/Button'
import Input from '@app/components/inputs/Input'

import { useCallback, useEffect, useState } from 'react'
import { useForm, FieldValues, SubmitHandler } from 'react-hook-form'
import AuthSocialButton from './AuthSocialButton'
import { useRouter } from 'next/navigation'

type AuthFormProps = {}
type Variant = 'LOGIN' | 'REGISTER'

const AuthForm = ({}: AuthFormProps) => {
  const session = useSession()
  const router = useRouter()
  const [variant, setVariant] = useState<Variant>('LOGIN')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (session?.status === 'authenticated') {
      // setVariant('LOGIN')
      // console.log('Authentication successful')
      router.push('/users')
    }
  }, [session?.status, router])

  const toggledVariant = useCallback(() => {
    if (variant === 'LOGIN') {
      setVariant('REGISTER')
    } else {
      setVariant('LOGIN')
    }
  }, [variant])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true)

    if (variant === 'REGISTER') {
      // axios Register
      axios
        .post('/api/register', data)
        .then(() => signIn('credentials', data))
        .catch(() => toast.error('Something went wrong'))
        .finally(() => {
          setIsLoading(false)
          toast.success('Registration successful')
        })
    }

    if (variant === 'LOGIN') {
      // nextAuth sign in
      signIn('credentials', {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error('Invalid credentials')
          }
          if (callback?.ok && !callback.error) {
            toast('Login successful')
            router.push('/users')
          }
        })
        .finally(() => {
          setIsLoading(false)
        })
    }
  }

  const socialAction = (action: string) => {
    setIsLoading(true)

    // NextAuth sign in
    signIn(action, { redirect: false })
      .then((callback) => {
        if (callback?.error) {
          toast.error('Invalid credentials')
        }
        if (callback?.ok && !callback.error) {
          toast('Login successful')
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {variant === 'REGISTER' && (
            <Input
              id="name"
              label="Name"
              register={register}
              disabled={isLoading}
              errors={errors}
            />
          )}
          <Input
            id="email"
            label="Email"
            type="email"
            register={register}
            disabled={isLoading}
            errors={errors}
          />
          <Input
            id="password"
            label="Password"
            type="password"
            register={register}
            disabled={isLoading}
            errors={errors}
          />
          <div>
            <Button disabled={isLoading} fullWidth type="submit">
              {variant === 'LOGIN' ? 'Sign In' : 'Register'}
            </Button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                Or continue with
              </span>
            </div>
          </div>
          <div className="mt-6 flex gap-2">
            <AuthSocialButton
              icon={BsGithub}
              onClick={() => socialAction('github')}
            />
            <AuthSocialButton
              icon={BsGoogle}
              onClick={() => socialAction('google')}
            />
          </div>
        </div>
        <div className="gap-2 flex justify-center text-sm mt-6 px-2 text-gray-500">
          <div>
            {variant === 'LOGIN'
              ? 'New to ChatDew?'
              : 'Already have an account'}
          </div>
          <div className="underline cursor-pointer" onClick={toggledVariant}>
            {variant === 'LOGIN' ? 'Create account' : 'Login'}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
