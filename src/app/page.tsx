import { currentUser } from "@/modules/authentication/actions";
import UserButton from "@/modules/authentication/components/user-button";
import Image from "next/image";

export default async function Home() {
  const user = await currentUser();
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <UserButton user={user} />
    </div>
  );
}
