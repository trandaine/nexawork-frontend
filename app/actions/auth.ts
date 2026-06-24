"use server"

import { signIn } from "@/auth"

export async function loginWithSSO() {
  await signIn("openiddict", { redirectTo: "/dashboard" })
}
