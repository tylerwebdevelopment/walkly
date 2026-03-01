"use server";

import { auth } from "@/lib/auth";
import { SignInSchema } from "@/lib/validations/auth";
import { headers } from "next/headers";
import { treeifyError } from "zod/v4/core";

export async function AccountSignIn(formData: FormData){
  
  const data = {
    email: formData.get('email'),
    password: formData.get('password')
  }

  const result = SignInSchema.safeParse(data);

  if(!result.success){
    const tree = treeifyError(result.error);
    return {errors: tree.properties}
  }

  const {email, password} = result.data;

   try{
      await auth.api.signInEmail({
        body: {
          email,
          password,
          rememberMe: true,
        },
        headers: await headers(),
      })

      return {success: true}
  
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch(err: any){
      return {errors: {email: {errors: [err.message]}}};
    }
}