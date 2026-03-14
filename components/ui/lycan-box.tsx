"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface LycanBoxProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  clipOverflow?: boolean;
}

export function LycanBox({
  title,
  icon,
  children,
  className,
  headerClassName,
  contentClassName,
  clipOverflow = true,
}: LycanBoxProps) {
  return (
    <div
      className={cn(
        "lycan-box rounded-lg",
        clipOverflow ? "lycan-box--clip" : "overflow-visible",
        className
      )}
    >
      {/* Ornamental Header */}
      <div
        className={cn(
          "lycan-box-header relative px-4 py-3",
          headerClassName
        )}
      >
        <div className="relative z-10 flex items-center gap-2">
          {icon && (
            <span className="text-[var(--lycan-white)]">{icon}</span>
          )}
          <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-[var(--lycan-white)]">
            {title}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className={cn("lycan-box-content p-4", contentClassName)}>
        {children}
      </div>
    </div>
  );
}
