"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Video } from "@/lib/youtube";

// Swipeable row of YouTube videos. Cards show a thumbnail and only load the
// YouTube player when tapped, so the page stays light and one video plays at a time.
export default function VideoCarousel({ videos }: { videos: Video[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);
  const [playing, setPlaying] = useState<number | null>(null);
  const [overflow, setOverflow] = useState(false);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(true);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      setOverflow(max > 1);
      setAtStart(track.scrollLeft <= 1);
      setAtEnd(track.scrollLeft >= max - 1);
      const bar = barRef.current;
      if (bar && max > 1) {
        const visible = track.clientWidth / track.scrollWidth;
        bar.style.width = `${visible * 100}%`;
        bar.style.transform = `translateX(${(track.scrollLeft / max) * (1 / visible - 1) * 100}%)`;
      }
    };
    update();
    track.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  const scrollPage = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
  };

  // Moves focus into the player so keyboard users can control it straight away.
  const focusPlayer = useCallback((el: HTMLIFrameElement | null) => el?.focus({ preventScroll: true }), []);

  return (
    <div className="video-carousel" role="region" aria-roledescription="carousel" aria-label="Leela videos">
      <ul className="video-track" ref={trackRef}>
        {videos.map((v, i) => (
          <li key={`${v.id}-${i}`} className={`video-card ${v.vertical ? "" : "wide"}`}>
            {playing === i ? (
              <iframe
                ref={focusPlayer}
                src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&playsinline=1&rel=0`}
                title={v.title ?? "YouTube video player"}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                className="video-poster"
                onClick={() => setPlaying(i)}
                aria-label={`Play video ${i + 1} of ${videos.length}${v.title ? `: ${v.title}` : ""}`}
              >
                <Thumbnail id={v.id} />
                <span className="video-play" aria-hidden>
                  <svg viewBox="0 0 24 24"><path d="M8 5.5v13l11-6.5z" /></svg>
                </span>
                {v.title && <span className="video-title">{v.title}</span>}
              </button>
            )}
          </li>
        ))}
      </ul>
      <div className="video-controls" hidden={!overflow}>
        <button className="video-arrow" onClick={() => scrollPage(-1)} disabled={atStart} aria-label="Previous videos">
          <svg viewBox="0 0 24 24" aria-hidden><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <span className="video-progress" aria-hidden><span ref={barRef} /></span>
        <button className="video-arrow" onClick={() => scrollPage(1)} disabled={atEnd} aria-label="Next videos">
          <svg viewBox="0 0 24 24" aria-hidden><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}

// maxresdefault is the sharpest thumbnail but not every video has one (YouTube then
// sends a 120×90 placeholder), so fall back to hqdefault, which always exists.
function Thumbnail({ id }: { id: string }) {
  const [fallback, setFallback] = useState(false);
  // Also runs on mount, for images that finished loading before hydration.
  const check = (img: HTMLImageElement | null) => {
    if (img?.complete && img.naturalWidth <= 120) setFallback(true);
  };
  return (
    <img
      ref={check}
      src={`https://i.ytimg.com/vi/${id}/${fallback ? "hqdefault" : "maxresdefault"}.jpg`}
      alt=""
      loading="lazy"
      decoding="async"
      onLoad={(e) => check(e.currentTarget)}
      onError={() => setFallback(true)}
    />
  );
}
