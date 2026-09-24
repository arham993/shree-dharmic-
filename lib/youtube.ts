export type VideoLink = { url: string; title?: string };
export type Video = { id: string; title?: string; vertical: boolean };

// Reads the video id from any YouTube link: Shorts, watch?v=, youtu.be, embed or live.
export function parseYouTube(link: string): Omit<Video, "title"> | null {
  let url: URL;
  try {
    url = new URL(/^https?:\/\//.test(link.trim()) ? link.trim() : `https://${link.trim()}`);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m|music)\./, "");
  const [first, second] = url.pathname.split("/").filter(Boolean);
  let id: string | null | undefined;
  if (host === "youtu.be") id = first;
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    id = first === "watch" ? url.searchParams.get("v") : ["shorts", "embed", "live"].includes(first) ? second : null;
  }
  return id && /^[\w-]{11}$/.test(id) ? { id, vertical: first === "shorts" } : null;
}

export function parseVideos(links: VideoLink[]): Video[] {
  return links.flatMap(({ url, title }) => {
    const video = parseYouTube(url);
    if (!video) console.warn(`Skipping unrecognised YouTube link: ${url}`);
    return video ? [{ ...video, title }] : [];
  });
}
