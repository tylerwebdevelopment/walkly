"use server";

import { SignUpSchema } from "@/lib/validations/auth";
import {auth} from '@/lib/auth';
import { treeifyError } from "zod";
import { capitalizeName } from "@/utils/capitalizeName";

// Signup Function
export async function AccountSignUp(formData: FormData){
  const data = {
    firstname: formData.get('firstname'),
    lastname: formData.get('lastname'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  }

  const result = SignUpSchema.safeParse(data);

  if(!result.success){
    const tree = treeifyError(result.error);
    return {errors: tree.properties}
  }

  const {firstname, lastname, email, password} = result.data;


  const name = capitalizeName(`${firstname} ${lastname}`);

  try{
    await auth.api.signUpEmail({
      body: {
        name,
        email,
        password,
      }
    });

    await auth.api.sendVerificationEmail({
      body: {
        email
      }
    })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch(err: any){
    return {errors: {email: {errors: [err.message]}}};
  }
}