import { SignOutButton } from "@/components";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div>
      {!session && redirect('/signin')}
      <p>Welcome Back {session?.user.name}</p>
      <SignOutButton/>
    </div>
  );
};

export default DashboardPage;
