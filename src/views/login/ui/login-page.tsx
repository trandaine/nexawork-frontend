"use client"

import { LoginForm } from "@features/auth/ui/login-form"
import { RowsIcon } from "@phosphor-icons/react"

export function LoginPageView() {
  return (
    <div className="flex flex-col min-h-svh items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex flex- items-center gap-2 self-center font-medium">
          {/* <div className="flex size-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <RowsIcon className="size-4" />
          </div> */}
          NexaWork
        </a>
        <LoginForm />
      </div>
    </div>
  )
}
