"use client";

import { useState, useRef } from "react";
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
} from "@heroicons/react/24/solid";
import { Card } from "@heroui/react";
import { useTranslation } from "@/hooks/useTranslation";

const YOUTUBE_EMBED_URL = "https://youtu.be/c7X_vPNYq3c?si=EijljmhDFrBeDGnj";
const FALLBACK_VIDEO_SRC = "";

function YouTubeEmbed({ videoId, title }: { videoId: string; title: string }) {
  const embedSrc = `https://www.youtube.com/embed/${videoId}?rel=0`;
  return (
    <iframe
      src={embedSrc}
      title={title}
      className="absolute inset-0 h-full w-full"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      loading="lazy"
    />
  );
}

function NativeVideoPlayer() {
  const { t } = useTranslation();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMuted = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  if (FALLBACK_VIDEO_SRC) {
    return (
      <div className="relative aspect-video w-full bg-black">
        <video
          ref={videoRef}
          src={FALLBACK_VIDEO_SRC}
          className="h-full w-full object-contain"
          playsInline
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          aria-label={t("video.playerLabel")}
        />
        <div className="absolute bottom-0 left-0 right-0 flex items-center gap-2 bg-black/70 p-2">
          <button
            type="button"
            onClick={togglePlay}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
            aria-label={playing ? t("video.pause") : t("video.play")}
          >
            {playing ? (
              <PauseIcon className="h-5 w-5" />
            ) : (
              <PlayIcon className="h-5 w-5" />
            )}
          </button>
          <button
            type="button"
            onClick={toggleMuted}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white transition hover:bg-white/30"
            aria-label={muted ? t("video.unmute") : t("video.mute")}
          >
            {muted ? (
              <SpeakerXMarkIcon className="h-5 w-5" />
            ) : (
              <SpeakerWaveIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 aspect-video bg-sky-50">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={togglePlay}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-500 text-white shadow-lg transition hover:bg-sky-600"
          aria-label={playing ? t("video.pause") : t("video.play")}
        >
          {playing ? (
            <PauseIcon className="h-7 w-7" />
          ) : (
            <PlayIcon className="h-7 w-7 ml-0.5" />
          )}
        </button>
        <button
          type="button"
          onClick={toggleMuted}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-sky-100 text-sky-600 transition hover:bg-sky-200"
          aria-label={muted ? t("video.unmute") : t("video.mute")}
        >
          {muted ? (
            <SpeakerXMarkIcon className="h-6 w-6" />
          ) : (
            <SpeakerWaveIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <p className="text-sm text-default-500 text-center max-w-sm">
        Player responsivo com controles acessíveis (play/pause e volume). 
        Defina YOUTUBE_EMBED_URL ou FALLBACK_VIDEO_SRC no componente para o vídeo real.
      </p>
    </div>
  );
}

function getYoutubeId(url: string): string {
  if (!url.trim()) return "";
  const embedMatch = url.match(/youtube\.com\/embed\/([^/?]+)/);
  if (embedMatch) return embedMatch[1];
  const watchMatch = url.match(/[?&]v=([^&]+)/);
  if (watchMatch) return watchMatch[1];
  const shortMatch = url.match(/youtu\.be\/([^/?]+)/);
  if (shortMatch) return shortMatch[1];
  if (/^[\w-]{10,12}$/.test(url.trim())) return url.trim();
  return "";
}

export function VideoPlayer() {
  const { t } = useTranslation();
  const videoId = getYoutubeId(YOUTUBE_EMBED_URL);
  const hasYouTube = Boolean(videoId);

  return (
    <section id="video" className="w-full px-4 py-6 sm:py-10">
      <div className="mx-auto max-w-4xl">
        <Card className="w-full overflow-hidden border border-sky-100 bg-white shadow-xl">
          <div className="relative aspect-video w-full bg-sky-50">
            {hasYouTube && videoId ? (
              <YouTubeEmbed videoId={videoId} title={t("video.title")} />
            ) : (
              <NativeVideoPlayer />
            )}
          </div>
        </Card>
      </div>
    </section>
  );
}
