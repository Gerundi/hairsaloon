const DEFAULT_INSTAGRAM_URL =
  "https://www.instagram.com/medihairtour?igsh=MWJ3NW8wOTZ1OTJzeQ==";

export const INSTAGRAM_URL =
  import.meta.env.VITE_INSTAGRAM_URL?.toString() ?? DEFAULT_INSTAGRAM_URL;

