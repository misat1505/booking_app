"use client";
import { ScaleLoader } from "react-spinners";

export default function Loading({ text }: { text?: string }) {
  return (
    <div className="flex flex-row absolute inset-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <ScaleLoader color="rgb(59, 130, 246)" />
      {text && <div>{text}</div>}
    </div>
  );
}
