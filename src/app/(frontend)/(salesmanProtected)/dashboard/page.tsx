"use client";
import Loading from "@/components/common/Loading";
import StyledLink from "@/components/common/StyledLink";
import useFetch from "@/hooks/useFetch";

export default function Dashboard() {
  const { data, isLoading } = useFetch(
    `${process.env.NEXT_PUBLIC_API_URL}/dashboard`
  );

  if (isLoading) return <Loading />;

  return (
    <>
      <StyledLink href={"/dashboard/hotels"}>Show my hotels</StyledLink>
      <div>{JSON.stringify(data)}</div>
    </>
  );
}
