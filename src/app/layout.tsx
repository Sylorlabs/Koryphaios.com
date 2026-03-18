import type { Metadata } from "next";
import { Cinzel_Decorative, Sora } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://koryphaios.com"),
  title: "Koryphaios — AI Agent Orchestration Platform",
  description:
    "Stop wrestling with AI agents. Koryphaios orchestrates LLM providers with a Manager Worker Critic architecture, time travel undo, parallel agents, and cost tracking. Open source. Free.",
  keywords: [
    "AI agent orchestration",
    "LLM",
    "multi-agent",
    "vibe coding",
    "AI coding assistant",
    "Anthropic",
    "OpenAI",
    "Gemini",
    "open source",
  ],
  authors: [{ name: "Sylorlabs" }],
  icons: {
    icon: "/favicon.png",
    apple: "/logo-192.png",
  },
  openGraph: {
    title: "Koryphaios — AI Agent Orchestration Platform",
    description:
      "Orchestrate AI providers from one dashboard. Manager Worker Critic architecture, time travel undo, cost tracking. Open source.",
    type: "website",
    url: "https://koryphaios.com",
    images: [{ url: "/logo-512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Koryphaios — AI Agent Orchestration Platform",
    description:
      "Orchestrate AI providers from one dashboard. Open source, free, no markup.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${cinzel.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
