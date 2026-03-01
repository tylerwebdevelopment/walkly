"use server";
import { auth } from "@/lib/auth";
import { ResetPasswordSchema } from "@/lib/validations/auth";
import { treeifyError } from "zod/v4/core";

export const AccountResetPassword = async (
  formData: FormData
) => {

  const data = {
    token: formData.get('token'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  }
  
  const result = ResetPasswordSchema.safeParse(data);

  if(!result.success){
    const tree = treeifyError(result.error);
    return {errors: tree.properties}
  }


  try{
    await auth.api.resetPassword({
      body: {
        newPassword: result.data.password,
        token: result.data.token
      }
    });

    return {success: true};
  }catch{
    return {
      errors:{
        token: {
          errors: ['Invalid Or Expired Reset Link']
        }
      }
    }
  }
}