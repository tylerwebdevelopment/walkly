import { SignOutButton } from "@/components";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const DashboardPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <div>
      <p>Welcome Back {session?.user.name}</p>
      <SignOutButton/>
    </div>
  );
};

export default DashboardPage;
