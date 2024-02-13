"use client";

import Image from "next/image";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[400px]">
      <Image
        src={"/logo.avif"}
        alt="..."
        width={300}
        height={300}
        className="mx-auto mb-4"
      />
      <div>{error.message}</div>
    </div>
  );
}
