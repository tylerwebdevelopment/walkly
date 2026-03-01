"use server";

import { auth } from "@/lib/auth";
import { ForgotPasswordSchema } from "@/lib/validations/auth";
import { treeifyError } from "zod";

export const AccountForgotPassword = async (formData: FormData) => {
  const data = {email: formData.get('email')}

  const result = ForgotPasswordSchema.safeParse(data);

  if(!result.success){
    const tree = treeifyError(result.error);
    return {errors: tree.properties}
  }

  const {email} = result.data;


  try{
    await auth.api.requestPasswordReset({
      body: {
        email,
        redirectTo: `${process.env.BETTER_AUTH_URL}/reset-password`
      }
    });

    return {success: true};
  }catch{
    return {success: true}
  }


}