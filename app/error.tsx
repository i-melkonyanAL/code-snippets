"use client";

import Button from "@/components/reusable/button";

interface IProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: IProps) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
