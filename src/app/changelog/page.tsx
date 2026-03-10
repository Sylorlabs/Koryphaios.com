import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowLeft, Download, Sparkles, Bug, Zap, Shield } from "lucide-react";
import Link from "next/link";

interface ChangelogEntry {
  version: string;
  date: string;
  codeword: string;
  publish: boolean;
  changes: {
    type: "feature" | "fix" | "improvement" | "security";
    description: string;
  }[];
}

// CHANGELOG DATA
// Add the codeword "PUBLISH" to trigger updates
// Set publish: true only when ready to release
const changelog: ChangelogEntry[] = [
  {
    version: "0.2.0",
    date: "2026-03-09",
    codeword: "PUBLISH",
    publish: true,
    changes: [
      { type: "feature", description: "Automatic update checking every 2 hours with manual check option" },
      { type: "feature", description: "New changelog page at koryphaios.com/changelog" },
      { type: "improvement", description: "Enhanced update system with codeword verification" },
      { type: "improvement", description: "Better error handling for provider connections" },
      { type: "fix", description: "Fixed memory cleanup issues in long-running sessions" },
    ],
  },
  {
    version: "0.1.0",
    date: "2026-03-01",
    codeword: "PUBLISH",
    publish: true,
    changes: [
      { type: "feature", description: "Initial release of Koryphaios" },
      { type: "feature", description: "Multi-provider AI agent orchestration (11+ providers)" },
      { type: "feature", description: "Real-time WebSocket streaming with SSE fallback" },
      { type: "feature", description: "Time Travel (undo/redo) via shadow logger" },
      { type: "feature", description: "Parallel agent isolation with Git worktrees" },
      { type: "feature", description: "MCP integration for extensible tools" },
      { type: "feature", description: "Telegram bridge for remote access" },
      { type: "feature", description: "Desktop app built with Tauri" },
    ],
  },
];

const typeIcons = {
  feature: Sparkles,
  fix: Bug,
  improvement: Zap,
  security: Shield,
};

const typeColors = {
  feature: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  fix: "text-red-400 bg-red-400/10 border-red-400/20",
  improvement: "text-amber-400 bg-amber-400/10 border-amber-400/20",
  security: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
};

const typeLabels = {
  feature: "Feature",
  fix: "Bug Fix",
  improvement: "Improvement",
  security: "Security",
};

export default function ChangelogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        {/* Header */}
        <div className="border-b border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Changelog
            </h1>
            <p className="text-lg text-slate-400">
              Track updates and improvements to Koryphaios
            </p>
          </div>
        </div>

        {/* Changelog Entries */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-12">
            {changelog.map((entry) => (
              <article
                key={entry.version}
                className="relative pl-8 md:pl-0"
              >
                {/* Timeline line */}
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 to-transparent md:left-[140px]" />
                
                {/* Timeline dot */}
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-indigo-500 md:left-[136px]" />

                <div className="md:grid md:grid-cols-[140px_1fr] md:gap-8">
                  {/* Date & Version */}
                  <div className="mb-4 md:mb-0 md:text-right">
                    <div className="text-sm font-medium text-white">
                      {entry.version}
                    </div>
                    <time className="text-sm text-slate-500">
                      {new Date(entry.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    {entry.publish && (
                      <span className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 text-xs font-medium text-emerald-400 bg-emerald-400/10 rounded-full border border-emerald-400/20">
                        Released
                      </span>
                    )}
                  </div>

                  {/* Changes */}
                  <div className="bg-white/5 rounded-xl border border-white/10 p-6">
                    <ul className="space-y-4">
                      {entry.changes.map((change, index) => {
                        const Icon = typeIcons[change.type];
                        return (
                          <li key={index} className="flex items-start gap-3">
                            <span
                              className={`inline-flex items-center gap-1.5 px-2 py-1 text-xs font-medium rounded-md border ${typeColors[change.type]} shrink-0`}
                            >
                              <Icon className="w-3 h-3" />
                              {typeLabels[change.type]}
                            </span>
                            <span className="text-slate-300 text-sm leading-relaxed">
                              {change.description}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">
                  Ready to try the latest version?
                </h2>
                <p className="text-slate-400">
                  Download Koryphaios for your platform
                </p>
              </div>
              <Link
                href="/download"
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors"
              >
                <Download className="w-5 h-5" />
                Download
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
