"use client";

import { useEffect, useState } from "react";
import { MessageSquare, User, Clock, Pin } from "lucide-react";
import { LycanBox } from "@/components/ui/lycan-box";
import {
  getAnnouncementsAction,
  type AnnouncementData,
} from "@/app/actions/announcements";

export function DiscordNews() {
  const [items, setItems] = useState<AnnouncementData[]>([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      const data = await getAnnouncementsAction();
      if (!cancelled) setItems(data);
    };

    load();
    const interval = setInterval(load, 60_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <LycanBox title="News & Announcements" icon={<MessageSquare className="h-4 w-4" />} contentClassName="p-0">
      

      {/* Content */}
      <div className="max-h-96 divide-y divide-[var(--border)] overflow-y-auto">
        {items.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className={`p-4 transition-colors hover:bg-[var(--lycan-card-hover)] ${
              item.pinned ? "bg-[var(--lycan-gold)]/5" : ""
            }`}
          >
            {/* Author and time */}
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-[var(--lycan-gold)] to-[var(--lycan-orange)]">
                  <User className="h-4 w-4 text-[var(--lycan-dark)]" />
                </div>
                <span className="text-sm font-semibold text-[var(--lycan-gold)]">
                  {item.author}
                </span>
                {item.pinned && (
                  <Pin className="h-3 w-3 text-[var(--lycan-orange)]" />
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-[var(--muted-foreground)]">
                <Clock className="h-3 w-3" />
                {item.time}
              </div>
            </div>

            {/* Content */}
            <p className="text-sm leading-relaxed text-[var(--foreground)]/90">
              {item.content}
            </p>
          </div>
        ))}

        {items.length === 0 ? (
          <div className="p-4 text-sm text-[var(--muted-foreground)]">
            No announcements found.
          </div>
        ) : null}
      </div>

      {/* View More */}
      <div className="border-t border-[var(--border)] p-3">
        <button
          type="button"
          className="w-full rounded-md bg-[var(--lycan-card-hover)] py-2 text-sm font-medium text-[var(--lycan-gold)] transition-colors hover:bg-[var(--lycan-gold)]/10"
        >
          View All Announcements
        </button>
      </div>
    </LycanBox>
  );
}
