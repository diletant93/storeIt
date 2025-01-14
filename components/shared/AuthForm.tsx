"use client";
import { Button } from "@/components_shadcn/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components_shadcn/ui/form"
import { Input } from "@/components_shadcn/ui/input"
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormTypeProp } from "@/types/props";
import { getAuthFormValidationScheme } from "@/lib/validation";
import { createAccount } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";

const schema = z.object({
  fullName: z.string().min(2, { message: 'aluea ulie' }),
  email: z.string().email({ message: 'Provide a correct email' })
})

export default function page({ type }: { type: FormTypeProp }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [accountId, setAccountId] = useState<string>('')
  const authScheme = getAuthFormValidationScheme(type)
  const form = useForm<z.infer<typeof authScheme>>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: '',
      email: '',
    }
  })
  async function onSubmit(values: z.infer<typeof authScheme>) {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const user = await createAccount({
        fullName: values.fullName || '',
        email: values.email
      })
       setAccountId(user.accountId)
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Something went wrong while creating an account')
      }
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
            <h1 className="form-title">
              {type === 'sign-in' ? 'Sign in' : 'Sign up'}
            </h1>
            {type === 'sign-up' &&
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <div className='shad-form-item'>
                      <FormLabel className="shad-form-label">Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" className="shad-input" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage className="shad-form-message" />
                  </FormItem>
                )}
              />}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className='shad-form-item'>
                    <FormLabel className="shad-form-label">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" className="shad-input" {...field} />
                    </FormControl>
                  </div>
                  <FormMessage className="shad-form-message" />
                </FormItem>
              )}
            />
              <Button type="submit" className="form-submit-button" disabled={isLoading}>
                {isLoading && (
                  <Image
                    src='/assets/icons/loader.svg'
                    alt='loader'
                    width={24}
                    height={24}
                    className="ml-2 animate-spin"
                  />
                )}
                {type === 'sign-in' ? 'Sign in' : 'Sign up'}
              </Button>
            {errorMessage && (
              <p className="error-message">*{errorMessage}</p>
            )}
            <div className="body-2 flex justify-center">
              <p className="text-light-100">
                {type === 'sign-in'
                  ? 'Don\'t have an account?'
                  : 'Already have an account?'}
              </p>
              <Link href={type === 'sign-in' ? '/sign-up' : '/sign-in'} className="ml-1 font-medium text-brand">
                {' '}
                {type === 'sign-in' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </form>
        </Form>
        {accountId && (
            <OTPModal email={form.getValues('email')} accountId={accountId}/>
        )}

    </>
  );
}
