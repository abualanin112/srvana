import { UpdateIcon } from "@radix-ui/react-icons";

import { cn } from "@/lib/utils";

function Spinner({ className, ...props }) {
  return (
    <UpdateIcon
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
