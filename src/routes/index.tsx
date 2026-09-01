import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import albumArt from "@/assets/album-13-channels.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Matt Kindle — Official Website" },
      {
        name: "description",
        content:
          "Official website of singer-songwriter Matt Kindle. Listen to new music, Christian and country playlists, find upcoming shows, and get in touch.",
      },
      { property: "og:title", content: "Matt Kindle — Official Website" },
      {
        property: "og:description",
        content:
          "Honest songs rooted in melody, memory, and moments that linger. New music, shows, and more from Matt Kindle.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Matt Kindle — Official Website" },
      {
        name: "twitter:description",
        content:
          "Honest songs rooted in melody, memory, and moments that linger. New music, shows, and more from Matt Kindle.",
      },
    ],
  }),
  component: Index,
});

type PlaylistTab = "new" | "christian" | "country";

const TABS: { id: PlaylistTab; label: string }[] = [
  { id: "new", label: "New Music" },
  { id: "christian", label: "Christian" },
  { id: "country", label: "Country" },
];

const EMBEDS: Record<
  PlaylistTab,
  { src: string; title: string; caption?: string; apple?: boolean }
> = {
  new: {
    src: "https://embed.music.apple.com/us/playlist/matts-songs/pl.u-55D66M3tEpB3q?theme=dark",
    title: "Matt's Songs on Apple Music",
    apple: true,
  },
  christian: {
    src: "https://open.spotify.com/embed/artist/4kPWNGfm8xjSXSsZesTk7y?utm_source=generator&theme=0",
    title: "Matt Kindle on Spotify",
    caption: "Full Christian playlist coming soon — stream the latest on Spotify.",
  },
  country: {
    src: "https://open.spotify.com/embed/artist/4kPWNGfm8xjSXSsZesTk7y?utm_source=generator&theme=0",
    title: "Matt Kindle on Spotify",
    caption: "Full country playlist coming soon — stream the latest on Spotify.",
  },
};

function Index() {
  const [tab, setTab] = useState<PlaylistTab>("new");

  // Bandsintown widget
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgetv3.bandsintown.com/main.min.js";
    script.charset = "utf-8";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const embed = EMBEDS[tab];

  return (
    <div className="min-h-screen bg-background text-foreground wood-grain">
      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-20 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <a
            href="#top"
            className="font-display text-lg font-semibold tracking-[0.25em] text-primary glow-amber"
          >
            MATT KINDLE
          </a>
          <div className="flex gap-6 text-sm tracking-wide text-muted-foreground">
            <a href="#music" className="transition-colors hover:text-primary">Music</a>
            <a href="#shows" className="transition-colors hover:text-primary">Shows</a>
            <a href="#about" className="transition-colors hover:text-primary">About</a>
            <a href="#contact" className="transition-colors hover:text-primary">Contact</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <header id="top" className="relative flex min-h-[85vh] items-end justify-center overflow-hidden">
        <img
          src={albumArt.url}
          alt="13 Channels album artwork — a vintage Zenith television in a wood-paneled room"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/70" />
        <div className="absolute inset-0 vignette" />
        <div className="relative z-10 pb-20 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.5em] text-primary glow-amber">
            The new album
          </p>
          <h1 className="mt-3 font-display text-5xl font-semibold tracking-wide text-cream glow-amber sm:text-7xl">
            13 Channels
          </h1>
          <p className="mt-4 font-display text-xl tracking-[0.3em] text-muted-foreground">
            MATT KINDLE
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24">
        {/* MUSIC */}
        <section id="music" className="scroll-mt-24 pt-24">
          <h2 className="font-display text-4xl font-semibold text-primary glow-amber">Music</h2>
          <p className="mt-2 max-w-xl text-muted-foreground">
            Three dial positions on the old set — pick a channel and press play.
          </p>

          <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Playlists">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={tab === t.id}
                onClick={() => setTab(t.id)}
                className={`rounded-full border px-5 py-2 text-sm font-medium tracking-wide transition-all ${
                  tab === t.id
                    ? "border-primary bg-primary text-primary-foreground shadow-[0_0_24px_oklch(0.75_0.12_75/0.35)]"
                    : "border-border bg-card text-muted-foreground hover:border-primary/60 hover:text-primary"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-6" role="tabpanel">
            {embed.apple ? (
              <iframe
                key={tab}
                allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                frameBorder="0"
                height={450}
                className="w-full overflow-hidden rounded-xl border border-border"
                sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                src={embed.src}
                title={embed.title}
              />
            ) : (
              <iframe
                key={tab}
                src={embed.src}
                width="100%"
                height={450}
                frameBorder="0"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="rounded-xl border border-border"
                title={embed.title}
              />
            )}
            {embed.caption && (
              <p className="mt-3 text-sm italic text-muted-foreground">{embed.caption}</p>
            )}
          </div>

          <div className="mt-10 flex flex-col items-center gap-6 rounded-2xl border border-border bg-card p-8 sm:flex-row">
            <img
              src={albumArt.url}
              alt="13 Channels — Matt Kindle, album cover"
              className="w-40 rounded-lg shadow-[0_10px_40px_oklch(0.05_0.01_55/0.8)]"
            />
            <div>
              <h3 className="font-display text-2xl font-semibold text-cream">13 Channels</h3>
              <p className="mt-2 max-w-md text-muted-foreground">
                Thirteen stations of memory, faith, and back-road evenings — the new record from
                Matt Kindle.
              </p>
              <a
                href="https://open.spotify.com/artist/4kPWNGfm8xjSXSsZesTk7y"
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block rounded-full bg-primary px-6 py-2 text-sm font-semibold text-primary-foreground transition-shadow hover:shadow-[0_0_28px_oklch(0.75_0.12_75/0.45)]"
              >
                Listen on Spotify
              </a>
            </div>
          </div>
        </section>

        {/* SHOWS */}
        <section id="shows" className="scroll-mt-24 pt-24 text-center">
          <h2 className="font-display text-4xl font-semibold text-primary glow-amber">Shows</h2>
          <div className="mx-auto mt-10 max-w-3xl">
            <a
              className="bit-widget-initializer"
              data-artist-name="id_15630412"
              data-auto-style="false"
              data-background-color="transparent"
              data-text-color="oklch(0.92 0.03 90)"
              data-separator-color="oklch(0.32 0.035 55)"
              data-display-local-dates="true"
              data-display-past-dates="true"
              data-display-limit="all"
              data-app-id="695468e386442ab7aacc49b5c5ed6da8"
            >
              &nbsp;
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="mx-auto max-w-2xl scroll-mt-24 pt-24">
          <h2 className="font-display text-4xl font-semibold text-primary glow-amber">About</h2>
          <p className="mt-6 text-muted-foreground">
            Matt Kindle is a singer-songwriter crafting honest songs rooted in melody, memory, and
            moments that linger.
          </p>
          <p className="mt-4 text-muted-foreground">
            Inspired by God, family, and fun with friends.
          </p>
        </section>

        {/* CONTACT */}
        <section id="contact" className="scroll-mt-24 pt-24">
          <h2 className="font-display text-4xl font-semibold text-primary glow-amber">Contact</h2>
          <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            <a href="mailto:mallets.prompts0z@icloud.com" className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">
              Email
            </a>
            <a href="https://www.instagram.com/matt_kindle/" target="_blank" rel="noreferrer" className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">
              Instagram
            </a>
            <a href="https://open.spotify.com/artist/4kPWNGfm8xjSXSsZesTk7y" target="_blank" rel="noreferrer" className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">
              Spotify
            </a>
            <a href="https://www.youtube.com/@mattkindlemusic" target="_blank" rel="noreferrer" className="text-muted-foreground underline-offset-4 transition-colors hover:text-primary hover:underline">
              YouTube
            </a>
          </div>
        </section>

        <footer className="mt-24 border-t border-border pt-8 text-center text-xs tracking-widest text-muted-foreground">
          © 2026 MATT KINDLE
        </footer>
      </main>
    </div>
  );
}
