import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Download from "@/components/Download";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Download Koryphaios — Windows, macOS, Linux",
  description:
    "Download Koryphaios for Windows x64, macOS Apple Silicon, macOS Intel, Linux .deb, .rpm, and AppImage. Built with Tauri for native performance.",
};

export default function DownloadPage() {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        <Download />
      </main>
      <Footer />
    </>
  );
}
