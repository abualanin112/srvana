"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

const Field = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("grid gap-2", className)} {...props} />
));
Field.displayName = "Field";

const FieldLabel = React.forwardRef(({ className, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn(
      "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
      className
    )}
    {...props}
  />
));
FieldLabel.displayName = "FieldLabel";

const FieldDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
FieldDescription.displayName = "FieldDescription";

const FieldError = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    if (!children) {
      return null;
    }

    return (
      <p
        ref={ref}
        className={cn("text-sm font-medium text-destructive", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FieldError.displayName = "FieldError";

export { Field, FieldLabel, FieldDescription, FieldError };
