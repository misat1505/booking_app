import { auth } from "@/firebase/firebase-admin";

export default async function ProfilePage({
  params,
}: {
  params: { userId: string };
}) {
  const user = await auth.getUser(params.userId);

  return <div>{JSON.stringify(user)}</div>;
}
