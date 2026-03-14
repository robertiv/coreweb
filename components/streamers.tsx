"use client";

import { useRef } from "react";
import { LycanBox } from "./ui/lycan-box";
import { Twitch, ChevronLeft, ChevronRight, Users, Eye } from "lucide-react";

// Tipo basado en la respuesta de la API de Twitch
interface TwitchStream {  
  id: number;
  user_name: string;  
  user_login: string;
  title: string;
  viewer_count: number;  
  thumbnail_url: string;  
}

// Data estatica de ejemplo - reemplazar con llamado a API de Twitch
const mockStreamers: TwitchStream[] = [
  {    
    id: 1,
    user_name: "djmariio",   
    user_login: "djmariio",  
    title: "NOCHE CON ALBERE, GUARI, SASHA Y EL DOBLE P!! +18",
    viewer_count: 1798,    
    thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_djmariio-800x600.jpg",
  },
  {
    id: 2,
    user_name: "martibenza",    
    user_login: "martibenza",
    title: "NOCHE CON ALBERE, GUARI, SASHA Y EL DOBLE P!! +18",
    viewer_count: 1798,    
    thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_martibenza-300x300.jpg",
  },
  {
    id: 3,
    user_name: "martibenza",    
    user_login: "martibenza",
    title: "NOCHE CON ALBERE, GUARI, SASHA Y EL DOBLE P!! +18",
    viewer_count: 1798,    
    thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_martibenza-300x300.jpg",
  },
  {
    id: 4,
    user_name: "martibenza",    
    user_login: "martibenza",
    title: "NOCHE CON ALBERE, GUARI, SASHA Y EL DOBLE P!! +18",
    viewer_count: 1798,    
    thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_martibenza-300x300.jpg",
  },
  {
    id: 5,
    user_name: "martibenza",    
    user_login: "martibenza",
    title: "NOCHE CON ALBERE, GUARI, SASHA Y EL DOBLE P!! +18",
    viewer_count: 1798,    
    thumbnail_url: "https://static-cdn.jtvnw.net/previews-ttv/live_user_martibenza-300x300.jpg",
  },
];

// Funcion para formatear el thumbnail_url de Twitch
function getThumbnailUrl(url: string, width: number = 320, height: number = 180): string {
  return url.replace("{width}", width.toString()).replace("{height}", height.toString());
}

// Funcion para formatear el conteo de viewers
function formatViewerCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
}

export function Streamers() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 280;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <LycanBox
      title="Streamers"
      icon={<Twitch className="h-4 w-4" />}
      contentClassName="p-0"
    >
      <div className="relative">
        {/* Boton scroll izquierda */}
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-2 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--lycan-dark)]/90 text-[var(--foreground)] transition-all hover:bg-[var(--lycan-gold)] hover:text-[var(--lycan-dark)]"
          aria-label="Scroll left"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        {/* Contenedor del carrusel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto px-4 py-4 scrollbar-hide"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {mockStreamers.map((streamer) => (
            <a
              key={streamer.id}
              href={`https://twitch.tv/${streamer.user_login}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex-shrink-0 w-[200px] overflow-hidden rounded-lg bg-[var(--lycan-card)] transition-all hover:scale-[1.02] hover:ring-2 hover:ring-[var(--lycan-gold)]"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img
                  src={getThumbnailUrl(streamer.thumbnail_url) || "/placeholder.svg"}
                  alt={`${streamer.user_name} stream thumbnail`}
                  className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    // Fallback si la imagen no carga
                    const target = e.target as HTMLImageElement;
                    target.src = `https://placehold.co/320x180/1a1a24/d4a84b?text=${streamer.user_name}`;
                  }}
                />
                
                {/* Badge LIVE */}
                <div className="absolute left-2 top-2 flex items-center gap-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-bold uppercase text-white">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  Live
                </div>

                {/* Viewer count overlay */}
                <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-[var(--lycan-dark)]/80 px-1.5 py-0.5 text-xs font-medium text-[var(--foreground)]">
                  <Eye className="h-3 w-3 text-[var(--lycan-gold)]" />
                  {formatViewerCount(streamer.viewer_count)}
                </div>
              </div>

              {/* Info del streamer */}
              <div className="p-3">
                <h4 className="truncate font-semibold text-[var(--foreground)] group-hover:text-[var(--lycan-gold)]">
                  {streamer.user_name}
                </h4>
                <p className="mt-1 truncate text-xs text-[var(--muted-foreground)]">
                  {streamer.title}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Boton scroll derecha */}
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-2 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--lycan-dark)]/90 text-[var(--foreground)] transition-all hover:bg-[var(--lycan-gold)] hover:text-[var(--lycan-dark)]"
          aria-label="Scroll right"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Gradientes para indicar scroll */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[var(--lycan-card)] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[var(--lycan-card)] to-transparent" />
      </div>

      {/* Footer con contador total */}
      <div className="flex items-center justify-between border-t border-[var(--border)] px-4 py-2">
        <div className="flex items-center gap-2 text-xs text-[var(--muted-foreground)]">
          <Users className="h-3.5 w-3.5" />
          <span>{mockStreamers.length} streamers live</span>
        </div>
        <a
          href="https://www.twitch.tv/directory/game/Lycan%20Online"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-[var(--lycan-gold)] hover:underline"
        >
          BECOME A LYCANSRO STREAMER!
        </a>
      </div>
    </LycanBox>
  );
}
