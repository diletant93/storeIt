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
import { AuthFormType, getAuthFormValidationScheme } from "@/lib/validation";
import { createAccount, signIn } from "@/lib/actions/user.actions";
import OTPModal from "./OTPModal";


export default function page({ type }: { type: FormTypeProp }) {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [accountId, setAccountId] = useState<string>('')

  const authScheme = getAuthFormValidationScheme(type)
  const defaultValues = type === 'sign-up' ? { fullName: '', email: '' } : { email: '' }

  const form = useForm<AuthFormType>({
    resolver: zodResolver(authScheme),
    defaultValues:defaultValues as z.infer<typeof authScheme>,
    mode:'onChange'
  })
  async function onSubmit(values: z.infer<typeof authScheme>) {
    setIsLoading(true)
    setErrorMessage('')
    try {
      let user : {accountId:string} | null | {error:string}  = null;
      
      if('fullName' in values){
         user = await createAccount({
          fullName: (values.fullName) as string || '',
          email: values.email
        })
      }else{
         user = await signIn({email:values.email})
      }

      if(user && 'accountId' in user){
        setAccountId(user.accountId as string)
      }else{
        setErrorMessage(user!.error)
      }
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
              <Button type="submit" className="form-submit-button" disabled={isLoading} >
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
