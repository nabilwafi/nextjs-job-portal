import React from "react";

interface BadgeProps {
  component: React.ReactNode;
}

export const Badge = ({ component }: BadgeProps) => {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {component}
    </span>
  );
};
