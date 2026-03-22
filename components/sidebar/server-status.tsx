"use client";

import { useEffect, useState } from "react";
import { Wifi, WifiOff, Users, Clock, Server } from "lucide-react";
import { LycanBox } from "@/components/ui/lycan-box";
import { getServerStatusAction } from "@/app/actions/server-status";

export function ServerStatus() {
  const [serverTime, setServerTime] = useState<string>("");
  const [isOnline, setIsOnline] = useState(false);
  const [playersOnline, setPlayersOnline] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setServerTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadServerStatus = async () => {
      const status = await getServerStatusAction();

      if (cancelled) {
        return;
      }

      setPlayersOnline(status.playersOnline);
      setIsOnline(status.isOnline);
    };

    loadServerStatus();
    const interval = setInterval(loadServerStatus, 30_000);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, []);

  return (
    <LycanBox title="Server Status" icon={<Server className="h-4 w-4" />}>
      <div className="space-y-3">
        {/* Server Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">Status</span>
          <div className="flex items-center gap-2">
            {isOnline ? (
              <>
                <Wifi className="h-4 w-4 text-[var(--lycan-success)]" />
                <span className="text-sm font-medium text-[var(--lycan-success)]">
                  Online
                </span>
              </>
            ) : (
              <>
                <WifiOff className="h-4 w-4 text-[var(--lycan-danger)]" />
                <span className="text-sm font-medium text-[var(--lycan-danger)]">
                  Offline
                </span>
              </>
            )}
          </div>
        </div>

        {/* Server Time */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">
            Server Time
          </span>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[var(--lycan-gold)]" />
            <span className="text-sm font-mono font-medium text-[var(--foreground)]">
              {serverTime}
            </span>
          </div>
        </div>

        {/* Players Online */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-[var(--muted-foreground)]">
            Players Online
          </span>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-[var(--lycan-gold)]" />
            <span className="text-sm font-medium text-[var(--foreground)]">
              {playersOnline.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </LycanBox>
  );
}
