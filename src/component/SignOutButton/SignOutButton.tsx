"use client";
import { redirect } from "next/navigation";
import {AccountSignOut} from '@/actions/auth/signout'
import Button from '@/components/Button';


const SignOutButton = () => {

  const handleSignOut = async () => {
    const result = await AccountSignOut();

    if(result.success){
      redirect('/signin');
    }
  }

  return (
    <Button onClick={handleSignOut}>Sign out</Button>
  )
}

export default SignOutButton