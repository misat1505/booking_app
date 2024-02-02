"use client";

import { useUserContext } from "@/app/contexts/userContext";
import StyledButton from "@/components/common/StyledButton";
import { useEffect, useRef } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const { user } = useUserContext();
  const hasResetBeenCalled = useRef(false);
  const initialRender = useRef(true);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    if (user && !hasResetBeenCalled.current) {
      console.log(user, hasResetBeenCalled.current);
      hasResetBeenCalled.current = true;
      console.log("calling reset", hasResetBeenCalled.current);
      reset();
    }
  }, [user, reset]);

  return (
    <div>
      <p>{error.message}</p>
      <StyledButton onClick={reset}>Try again</StyledButton>
    </div>
  );
}
