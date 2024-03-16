import { ReactNode } from "react";

export function UpdateRow({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-1">
      <div className="text-muted-foreground w-[150px] text-sm">{label}</div>
      {children}
    </div>
  );
}
